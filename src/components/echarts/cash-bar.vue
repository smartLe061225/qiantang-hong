<template>
  <div>
      <div class="normal-box-mod">
          <div class="normal-box-hd clearfix">
              <div class="normal-box-opt">
                  <a href="javascript:;" class="mr-10">标准利润表</a>
                  <router-link to="/analysis/list/3">重新导入</router-link>
                  <a :href="pic" download title="导出图表">导出</a>
              </div>
            <div class="normal-box-title">
              <div class="decorate-square"></div>
              <h2>现金分析</h2>
              </div>
          </div>
          <div class="normal-box-bd">
              <div class="chart-filter">
                <Select v-model="companyIds" multiple style="width:220px" placeholder="请选择公司" @on-change="reDrawChart">
                  <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="modelIndex" multiple style="width:350px" placeholder="请选择指标" @on-change="reDrawChart">
                  <Option v-for="item in indexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="dateFilter.model" style="width:100px" placeholder="请选择查询日期" @on-change="reDrawChart">
                  <Option v-for="item in dateFilter.select" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
          </div>
          <div class="normal-box-bd">
            <div class="cash-bar">
              <div class="echarts"></div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajaxPostAnalysisReportCashflow } from "src/apis/analysis";

  export default {
    data () {
      return {
        companyIds: [1],
        modelIndex: ['经营活动产生的现金流量','收到的税费返还'],
        seriesData: [],
        myChart: {},
        pic: '',
        companyList: [],
        indexList: [],
        dateFilter: {
          model: 1,
          select: echartsConfig.filterDateArr
        }
      }
    },
    methods: {
      init(){        
        this.reDrawChart()
      },
      reDrawChart(){
        const self = this;
        this.getSeriesData(self.setChart);
      },
      setChart(){
        const self = this;
        this.myChart = echarts.init(document.querySelector('.cash-bar .echarts'));
        let option = echartsConfig.barChartOptions({
          legendData: self.modelIndex,
          xAxis: self.companyNames,
          seriesData: self.seriesData
        })
        if (option && typeof option === "object") {
            this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)
        this.pic = self.myChart.getDataURL()
      },
      getSeriesData(callback){
        const self = this;
        let data = {
          "data":{
            "indexNames": self.modelIndex.join(','),
            "companyIds": self.companyIds.join(','),
            "type": self.dateFilter.model
          }
        }
        ajaxPostAnalysisReportCashflow(data).then(rs => {
          let data = rs.data;
          if (data.length>0) {
            self.seriesData = tools.formatBarSeriesData(data, self.modelIndex)
            if (callback && typeof callback === "function") {
              callback();
            }
          }
        })
      }
    },
    computed: {
      companyNames: function(){
        const self = this;
        return tools.getCompanyName(self.companyIds, self.companyList)
      }
    },
    created: function(){
      this.companyList = echartsConfig.getCompanyData()
      this.indexList = echartsConfig.getProfitsIndex(3);
    },
    mounted() {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .cash-bar{
    height: 500px;
    .echarts{
      width: 100%;
      height: 100%;
    }
  }
</style>
