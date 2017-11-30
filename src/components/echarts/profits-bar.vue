<template>
  <div class="normal-box-mod">
    <div class="normal-box-hd clearfix">
        <div class="normal-box-opt">
            <a href="javascript:;" class="mr-10">标准利润表</a>
            <router-link to="/analysis/list/1">重新导入</router-link>
        </div>
      <div class="normal-box-title">
        <div class="decorate-square"></div>
        <h2>利润分析</h2>
        </div>
    </div>
    <div class="normal-box-bd">
        <div class="chart-filter">
          <Form :label-width="100">
            <FormItem label="选择公司：">
            <RadioGroup v-model="filter.company.value" @on-change="reLoadChart">
                <Radio :label="item" v-for="item in filter.company.list" :key="item"></Radio>
            </RadioGroup>
            </FormItem>
            <FormItem label="选择指标：">
              <RadioGroup v-model="filter.index.value" @on-change="reLoadChart">
                  <Radio :label="item" v-for="item in filter.index.list" :key="item"></Radio>
              </RadioGroup>
            </FormItem>

            <!-- <FormItem label="选择时间：">
              <RadioGroup v-model="filter.time.value" type="button" @on-change="reLoadChart">
                  <Radio v-for="item in filter.time.list" :key="item" :label="item"></Radio>
              </RadioGroup>
            </FormItem> -->
          </Form>
        </div>
    </div>
    <div class="normal-box-bd">
      <div class="profits-bar">
        <div class="echarts"></div>
      </div>
    </div>

    <!-- 弹出层图表 -->
    <Modal v-model="chartModel" :title="filter.company.value +' '+ filter.index.value + '明细 ' + triggerMouth" width="600" class="custom-modal">
      <div class="profits-pie">
        <div class="echarts" style="width:496px;height:300px;"></div>
      </div>
      <div slot="footer" style="display: none;"></div>
    </Modal>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostProfitIndex, ajaxPostProfitData } from "src/apis/analysis";

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
          subclassSonArr: []
        },
        chartModel: false,
        triggerMouth: ''
      }
    },
    methods: {
      setChart(){
        const self = this;
        this.myChart = echarts.init(document.querySelector('.profits-bar .echarts'));
        let convertResource = tools.convertResourceData(self.resource, self.companyIds, self.filter.index.value.split(','));
        let seriesData = tools.getBarChartSeriesData(convertResource, self.filter.index.value.split(','))

        let option = echartsConfig.bar15ChartOptions({
          seriesData: seriesData
        })
        echartsConfig.formatyAxis(option.yAxis);
        if (option && typeof option === "object") {
          this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)
        
        self.myChart.on('click', function (params) {
          if (self.resourceIndex.parentclassArr.join(',') === '费用') {
            self.triggerChart(params)
          } 
        });
               
      },
      triggerChart(params){
        const self = this;
        this.chartModel = true;
        this.triggerMouth = params.name.split(',')

        let subclassArr = self.resourceIndex.subclassArr
    
        let seriesDataResource = tools.convertResourceData(self.resource, self.companyIds, subclassArr, params.name.split(','));
        let seriesData = tools.getPie2ChartSeriesData(seriesDataResource, subclassArr)

        let option = echartsConfig.pie2ChartOptions({
          legendData: subclassArr,
          seriesName: self.filter.index.value,
          seriesData: seriesData,
        })

        this.myChart2 = echarts.init(document.querySelector('.profits-pie .echarts'));
        this.myChart2.setOption(option, true);
      },
      reLoadChart(){
        const self = this;
        this.getResourceData(self.setChart)
      },
      getResourceData(callback){
        const self = this;
        let data = {
          data:{
            indexNames: self.filter.index.value,
            companyIds: self.companyIds.join(','),
            type: self.dateType
          }
        }
        this.$Loading.start();
        ajaxPostProfitData(data).then(rs => {
          if (rs.status == 'success') {
            self.$Loading.finish();
            self.resource = rs.data[0].data;
            self.resourceIndex = {
              parentclassArr : rs.data[0].parentclass.split(','),
              subclassArr : rs.data[0].subclass.split(','),
              subclassSonArr : rs.data[0].subclassSon.join(',').split(',')
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
      dateType: function(){
        switch(this.filter.time.value){
          case '年初余额':
            return 1
            break;
          case '期末余额':
            return 2
            break;
        }
      },
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
      Promise.all([ajax_get_company_selectbox(), ajaxPostProfitIndex(), self.getTimeType()]).then(rs => {
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

        let timeData = rs[2]
        self.filter.time.list = timeData;
        self.filter.time.value = timeData[0]
      }).then(rs => {
        self.getResourceData(self.setChart)
      })
    },
    mounted() {
    }
  }
</script>
<style lang="less">
.profits-bar{
  height: 500px;
  .echarts{
    width: 100%;
    height: 100%;
  }
}
.custom-modal{
  .ivu-modal-body{
    padding: 52px;
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