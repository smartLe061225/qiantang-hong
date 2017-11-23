<template>
  <div class="dashboard-pie">
    <div class="echarts"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostAnalysisReportAssets } from "src/apis/analysis";

  export default {
    data() {
      return {
        name: 'dashboard-pie',
        myChart: {},
        seriesData: [],
        legendData: ['货币资金','短期投资','应收票据','应收账款','预付账款','应收股利','应收利息','其他应收款','存货','库存商品','周转材料','其他流动资产']
      }
    },
    methods: {
      init(){
        this.myChart = echarts.init(document.querySelector('.dashboard-pie .echarts'));
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
                type: 2,
                indexNames: self.legendData.join(',')
              }
            }
            ajaxPostAnalysisReportAssets(data).then(result=>{
              if (result.status == 'success') {
                const resultData = result.data[0].data;
                if (resultData.length>0) {
                  resultData.forEach(function(v){
                      self.seriesData.push({value: v.total,name: v.index_name})
                  })
                  self.setChartOption()
                }else{
                  self.myChart.hideLoading()
                  self.myChart.clear()
                  document.querySelector('.dashboard-pie').innerHTML = "暂无数据"
                }
              }
            })
          }
        })
      },
      setChartOption(){
        let self = this;
        self.myChart.hideLoading()
        let options = echartsConfig.pieChartOptions({
          legendData: self.legendData,
          seriesName: '流动资产来源构成',
          seriesData: self.seriesData,
        })
        self.myChart.setOption(options);
      }
    },
    mounted() {      
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .dashboard-pie{
    height: 300px;
    width: 100%;
    .echarts{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>