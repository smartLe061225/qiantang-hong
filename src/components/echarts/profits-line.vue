<template>
  <div class="normal-box-mod">
    <div class="normal-box-hd clearfix">
        <div class="normal-box-opt">
            <a class="mr-10" href="/api/reportprofit/downloadTemplate" download>标准利润表</a>
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
          </Form>
        </div>
    </div>
    <div class="normal-box-bd">
      <Row>
        <Col span="18">
          <div class="profits-line">
            <div class="echarts"></div>
          </div>
        </Col>
        <Col span="6">
          <div class="profits-bar">
            <div class="echarts" style="height:250px"></div>
          </div>
          <div class="profits-bar2">
            <div class="echarts" style="height:250px"></div>
          </div>
        </Col>
    </Row>
      
    </div>

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
        this.setBarAChart()

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
          color: ['#b6a2de','#2ec7c9'],
          legendData: legendData,
          seriesData: seriesData
        })

        this.myChart = echarts.init(document.querySelector('.profits-line .echarts'));
        if (option && typeof option === "object") {
          this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)
        self.myChart.on('click', function (params) {
          self.setBarAChart(params)
        });
      },
      setBarAChart(params){
        const self = this;
        // A. 饼状图
        let subIndex = this.current.subIndex; // 指标的信息
        let resourceData = this.resource[this.current.bar];

        let curmouth = params ? params.dataIndex : this.current.mouth

        let seriesData = resourceData[curmouth].bar1List
        let seriesTitle = resourceData[curmouth].bar1Title

        let option = echartsConfig.pieCustomOptions({
          color: ['#332942','#4a3c5f','#78609a'],
          title: seriesTitle,
          seriesData: seriesData.sort(function (a, b) { return a.value - b.value; })
        })

        this.myChartBarA = echarts.init(document.querySelector('.profits-bar .echarts'));
        if (option && typeof option === "object") {
          this.myChartBarA.setOption(option, true);
        }
        echartsConfig.resize(self.myChartBarA)

        // B. 饼状图
        let seriesData2 = resourceData[curmouth].bar2List
        let seriesTitle2 = resourceData[curmouth].bar2Title

        let option2 = echartsConfig.pieCustomOptions({
          color: ['#2d7476','#3fb5b7','#9ee2e3'],
          title: seriesTitle2,
          seriesData: seriesData2.sort(function (a, b) { return a.value - b.value; })
        })

        this.myChartBarB = echarts.init(document.querySelector('.profits-bar2 .echarts'));
        if (option2 && typeof option2 === "object") {
          this.myChartBarB.setOption(option2, true);
        }
        echartsConfig.resize(self.myChartBarB)

      },
      reLoadChart(){
        const self = this;
        this.getResourceData(self.setChart)
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
.profits-line{
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