<template>
  <div class="normal-box-mod">
      <div class="cash-pie">
        <div class="echarts" style="height:430px;"></div>
      </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostCashIndex, ajaxPostCashData } from "src/apis/analysis";

  export default {
    data () {
      return {
        filter: {
          company: {
            value: '',
            list: []
          },
          index: {
            value: '',
            list: []
          },
          time: {
            value: '',
            list: []
          }
        },
        companyResourceData: [],
        resource: [],
        resourceIndex:{
          parentclassArr: [],
          subclassArr: [],
          inputArr: [],
          outputArr: []
        }
      }
    },
    methods: {
      triggerChart(){
        const self = this;

        let currentMouth = new Date().getFullYear() + '-' + (new Date().getMonth()+1)

        let inputValue = self.resourceIndex.inputArr;
        let outputValue = self.resourceIndex.outputArr;

        let inputResourceData = tools.convertResourceData(self.resource, self.companyIds, inputValue, currentMouth.split(','));
        let outputResourceData = tools.convertResourceData(self.resource, self.companyIds, outputValue, currentMouth.split(','))

        let yAxisData = tools.intervalMergeArray(inputValue, outputValue).reverse();

        let outputSeriesData = tools.getbar8OutputChartSeriesData(outputResourceData, outputValue)
        let inputSeriesData = tools.getbar8InputChartSeriesData(inputResourceData, inputValue)
        let seriesData = tools.intervalMergeArray(inputSeriesData, outputSeriesData).reverse()

        let option = echartsConfig.bar8ChartOptions({
          title: new Date().getFullYear() +'年'+(new Date().getMonth()+1)+'月'+this.resourceIndex.parentclassArr.join(',')+'表',
          yAxis: yAxisData,
          seriesData: seriesData,
        })
        echartsConfig.formatyAxis(option.xAxis);
        this.myChart2 = echarts.init(document.querySelector('.cash-pie .echarts'));
        this.myChart2.setOption(option, true);

      },
      getResourceData(callback){
        const self = this;
        let data = {
          data:{
            indexNames: self.filter.index.value,
            companyIds: self.companyIds.join(','),
            type: 2
          }
        }
        this.$Loading.start();
        ajaxPostCashData(data).then(rs => {
          if (rs.status == 'success') {
            self.$Loading.finish();
            self.resource = rs.data[0].data;
            self.resourceIndex = {
              parentclassArr : rs.data[0].parentclass.split(','),
              subclassArr : rs.data[0].subclass.split(','),
              inputArr : rs.data[0].subclassSon[0].split('#'),
              outputArr: rs.data[0].subclassSon[1].split('#')
            }
            if (callback && typeof callback === "function") {
              callback();
            }
          }else{
            self.Message.error(rs.message)
            self.$Loading.error();
          }
        })
      },
      getTimeType: function(){        
        return ['期末余额']
      }
    },
    computed: {
      companyIds: function(){
        const self = this;
        return tools.getCompanyID(self.filter.company.value.split(','), self.companyResourceData)
      },
      companyNames: function(){
        const self = this;
        return tools.getCompanyName(self.companyIds, self.companyResourceData)
      }
    },
    created: function(){
      const self = this;
      Promise.all([ajax_get_company_selectbox(), ajaxPostCashIndex()]).then(rs => {
        let companyData = echartsConfig.getCompanyList(rs[0]) // 包含键值公司数据
        let companyName = echartsConfig.getCompanyName(companyData); // 二次处理，仅获取公司名

        if (companyData.length) {
          this.companyResourceData = companyData;
          self.filter.company.list = companyName;
          self.filter.company.value = companyName[0];
        }

        let indexData = echartsConfig.getIndexList(rs[1])
        if (indexData.length) {
          self.filter.index.list = indexData;
          self.filter.index.value = indexData[0]
        }

      }).then(rs => {
        self.getResourceData(self.triggerChart)
      })
    }
  }
</script>
<style lang="less">
.cash-bar{
  height: 500px;
  .echarts{
    width: 100%;
    height: 100%;
  }
}
.custom-modal{
  &.cash-custom-modal{
    .ivu-modal-body{
      padding: 22px; 
    }
  }  
  .ivu-select,.ivu-date-picker{
    margin-bottom: 15px;
  }
  .ivu-modal-content{
    border-radius: 0;
  }
  .ivu-modal-header-inner{
    font-weight: normal;
    font-size: 14px;
    color: #aeaeaf;
  }  
}

  .chart-filter{
    .ivu-form{
      .ivu-form-item{
        margin-bottom: 12px;
      }
      .ivu-form-item-label{
        font-size: 14px;
        color: #c2c2c3;
      }
      .ivu-checkbox-wrapper{
        margin-right: 20px;
        font-size: 14px;
        color: #8d8d8e;
      }
      .ivu-radio-wrapper{
        font-size: 14px;
        color: #8d8d8e;
      }
    }
  }
</style>