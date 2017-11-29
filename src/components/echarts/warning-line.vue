<template>
  <div class="normal-box-mod">
    <div class="normal-box-hd clearfix">
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
            <FormItem label="选择年份：">
              <DatePicker v-model="filter.year" type="year" placeholder="年份" style="width: 80px"></DatePicker>
            </FormItem>
          </Form>
        </div>
    </div>
    <div class="normal-box-bd">
      <div class="warning-line">
        <div class="echarts"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostWarningData } from "src/apis/analysis";

  export default {
    data () {
      return {
        filter: {
          company: {
            value: '',
            list: []
          },
          year: new Date().getFullYear().toString()
        },
        resource: [],
        chartTypeArr: ['企业偿还能力分析','资产负债率分析','销售利润率分析','成本利润率分析']
      }
    },
    methods: {
      setChart(){
        const self = this;
        let seriesData = tools.getWarningSeriesData(self.resource, self.chartTypeArr)
        let option = echartsConfig.lineChartOption({
          legendData: self.chartTypeArr,
          seriesData: seriesData
        })

        this.myChart = echarts.init(document.querySelector('.warning-line .echarts'));
        if (option && typeof option === "object") {
          this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)    
      },
      reLoadChart(){
        const self = this;
        this.getResourceData(self.setChart)
      },
      getResourceData(callback){
        const self = this;
        let data = {
          data:{
            companyId: self.companyIds.join(','),
            year: self.filter.year
          }
        }
        this.$Loading.start();
        ajaxPostWarningData(data).then(rs => {
          if (rs.status == 'success') {
            self.$Loading.finish();
            self.resource = rs.data;
            if (callback && typeof callback === "function") {
              callback();
            }
          }else{
            self.Message.error(rs.message)
            self.$Loading.error();
          }
        })
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
      Promise.all([ajax_get_company_selectbox()]).then(rs => {
        let companyData = echartsConfig.getCompanyList(rs[0]) // 包含键值公司数据
        let companyName = echartsConfig.getCompanyName(companyData); // 二次处理，仅获取公司名

        if (companyData.length) {
          this.companyResourceData = companyData;
          self.filter.company.list = companyName;
          self.filter.company.value = companyName[0];
        }

      }).then(rs => {
        self.getResourceData(self.setChart)
      })
    },
    mounted() {
    }
  }
</script>
<style lang="less">
.warning-line{
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