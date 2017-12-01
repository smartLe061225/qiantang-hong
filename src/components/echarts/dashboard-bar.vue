<template>
  <div class="dashboard-bar">
    <div class="echarts"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import * as tools from 'src/util/tools'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxGetBalanceData } from "src/apis/analysis";

  export default {
    data() {
      return {
        name: 'dashboard-bar',
        myChart: {},
        xAxis: ['营业收入','费用','利润总额','现金流'],
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
        ajaxGetBalanceData().then(rs => {
          if (rs.status == 'success') {
            self.setChartOption(tools.getBalanceSeriesData(rs.data.series_data, self.xAxis, 'bar'))
          }else{
            self.$Message.error(rs.message)
          }
        })
      },
      setChartOption(seriesData){
        let self = this;
        self.myChart.hideLoading()

        let option = echartsConfig.barChartOptions({
          title: '多个公司收支变化趋势',
          legendData: self.xAxis,
          seriesData: seriesData,
          color: ['#2ec7c9','#b7a3df','#5ab1ef','#ffb981','#d97a81'],
        })

        echartsConfig.formatyAxis(option.yAxis);
        self.myChart.setOption(option);
      }
    },

    mounted() {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .dashboard-bar{
    height: 450px;
    width: 100%;
    .echarts{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>