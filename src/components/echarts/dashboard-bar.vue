<template>
  <div class="dashboard-bar">
    <div class="echarts"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostAnalysisReportprofit } from "src/apis/analysis";


  export default {
    data() {
      return {
        name: 'dashboard-bar',
        myChart: {},
        xAxis: ['营业收入','营业成本','利润总额','净利润'],
        seriesData: []
      }
    },
    methods: {
      init(){
        this.myChart = echarts.init(document.querySelector('.dashboard-bar .echarts'));
        this.myChart.showLoading();
        this.showChart()
        echartsConfig.resize(this.myChart)
      },
      showChart() {
        const self = this;
        ajax_get_company_selectbox().then(rs => {
          if (rs.status == 'success') {
            let data = {
              "data": {
                companyIds: rs.data[0].id,
                type: 1,
                indexNames: self.xAxis.join(',')
              }            
            }
            ajaxPostAnalysisReportprofit(data).then(result=>{
              if (result.status == 'success') {
                const resultData = result.data[0].data;
                if (resultData.length>0) {
                  resultData.forEach(function(v){
                    self.seriesData.push(v.total)
                  })
                  self.setChartOption()
                }
              }
            })
          }
        })
      },
      setChartOption(){
        let self = this;
        self.myChart.hideLoading()
        self.myChart.setOption({
          title: { 
            text: '集团资产变化曲线',
            x: 'center'
          },
          tooltip: {},
          xAxis: {
              data: self.xAxis
          },
          yAxis: {},
          itemStyle: {
            normal:{
              color: function (params){
                return echartsConfig.setColor(params.dataIndex)
              }
            }
          },
          series: [{
              type: 'bar',
              data: self.seriesData
          }]
        });
      }
    },
    mounted() {      
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .dashboard-bar{
    height: 300px;
    width: 100%;
    .echarts{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>