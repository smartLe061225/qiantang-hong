<template>
  <div class="dashboard-line">
    <div class="echarts"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostProfitIndex, ajaxPostProfitsData } from "src/apis/analysis";

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
          }
        },
        companyResourceData: [],
        indexResourceData: [],
        resource: [],
        current:{
          subIndex: [],
          compare: '',
          bar: '',
          mouth: new Date().getMonth()
        }
      }
    },
    methods: {
      setChart(){

        this.setLineChart()

      },
      setLineChart(){
        const self = this;
        // A. 画折线图
        let subIndex = this.current.subIndex; // 指标的信息
        let legendData = tools.getCheckboxLable(subIndex)
        let legendValue = tools.getCheckboxValue(subIndex)
        let resourceData = this.resource;
        
        let seriesData = tools.getLine2seriesData(legendData, legendValue, resourceData)

        let option = echartsConfig.line2ChartOption({
          title: new Date().getFullYear()+"收入成本累计",
          xAxis: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          color: ['#b6a2de','#2ec7c9'],
          legendData: legendData,
          seriesData: seriesData
        })
        echartsConfig.formatyAxis(option.yAxis);

        this.myChart = echarts.init(document.querySelector('.dashboard-line .echarts'));
        if (option && typeof option === "object") {
          this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)
      },
      getResourceData(callback){
        const self = this;
        let data = {
          data:{
            companyId: this.currentCompanyID.join(','), // 公司ID,如：1；注意：总公司可传入值为空
            type: this.currentIndexID.join(','), // 指标类型，如：1
            year: new Date().getFullYear().toString() // 年份，如：2017
          }
        }
        this.$Loading.start();
        ajaxPostProfitsData(data).then(rs => {
          if (rs.status == 'success') {
            self.$Loading.finish();
            self.resource = rs.data; // 把结果集存起来
            self.getIndexInfo()
            if (callback && typeof callback === "function") {
              callback();
            }
          }else{
            self.Message.error(rs.message)
            self.$Loading.error();
          }
        })
      },
      getIndexInfo: function(){ // 获取指标信息
        let index = this.currentIndexID.join(',') - 1;
        let data = this.indexResourceData[index]
        this.current.subIndex = data.subIndex;
        this.current.compare = data.compare;
        this.current.bar = data.bar;
      },
      createIndex: function(){ // 创建指标
        return [{
          label: '收入成本',
          value: 1,
          subIndex: [{label: '收入',value: 'business_income_list'},{label: '成本',value: 'operating_cost_list'}],
          compare: 'incomeBudgetCompareList',
          bar: 'compositionDatas'
        },{
          label:'收入同期',
          value: 2,
          subIndex: [{label: '上期收入',value: 'previous_list'},{label: '本期收入',value: 'period_list'}],
          compare: 'period_incomeCompareList',
          bar: 'compositionDatas'
        },{
          label:'成本同期',
          value: 3,
          subIndex: [{label: '上期成本',value: 'previous_list'},{label: '本期成本',value: 'period_list'}],
          compare: 'period_costCompareList',
          bar: 'compositionDatas'
        }]
      }
    },
    computed: {
      currentCompanyID: function(){ // 计算当前公司ID
        const self = this;
        return tools.getCurrentValue(self.filter.company.value.split(','), self.companyResourceData)
      },
      currentCompanyName: function(){ // 计算当前公司名
        const self = this;
        return tools.getCurrentLable(self.currentCompanyID, self.companyResourceData)
      },
      currentIndexID: function(){ // 计算当前指标ID
        const self = this;
        return tools.getCurrentValue(self.filter.index.value.split(','), self.indexResourceData)
      },
      currentIndexName: function(){ // 计算当前指标名
        const self = this;
        return tools.getCurrentLable(self.currentIndexID, self.indexResourceData)
      }
    },
    created: function(){
      const self = this;
      Promise.all([ajax_get_company_selectbox(), self.createIndex()]).then(rs => {
        // 一、公司列表
        let visualCompany = [{label: '总公司',value: ''}] // 1. 创建虚礼总公司
        let companyData = visualCompany.concat(echartsConfig.getCompanyList(rs[0])) // 2. 包含键值公司数据，并合并总公司
        let companyName = tools.getCheckboxLable(companyData); // 3. 二次处理，仅获取公司名（单选需要）
        if (companyData.length) {
          self.companyResourceData = companyData; // 保存完整
          self.filter.company.list = companyName;
          self.filter.company.value = companyName[0];
        }

        // 二、指标列表
        let indexData = rs[1];
        let indexNames = tools.getCheckboxLable(indexData)
        if (indexData.length) {
          self.indexResourceData = indexData;
          self.filter.index.list = indexNames;
          self.filter.index.value = indexNames[0];
        }
      }).then(rs => {
        // 三、当获取公司列表和指标列表后，再执行向服务器发送请求
        self.getResourceData(self.setChart)
      })
    }
  }
</script>
<style lang="less">
.dashboard-line{
  height: 450px;
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