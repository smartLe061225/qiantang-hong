<template>
  <div>
      <div class="normal-box-mod">
          <div class="normal-box-hd clearfix">
              <div class="normal-box-opt">
                  <a href="javascript:;" class="mr-10">标准利润表</a>
                  <a href="javascript:;" class="mr-10">重新导入</a>
                  <a href="javascript:;">导出</a>
              </div>
            <div class="normal-box-title">
              <div class="decorate-square"></div>
              <h2>利润分析</h2>
              </div>
          </div>
          <div class="normal-box-bd">
              <div class="chart-filter">
                <Select v-model="companyIds" multiple style="width:220px" placeholder="请选择公司" @on-change="reDrawChart">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="modelIndex" multiple style="width:280px" placeholder="请选择指标" @on-change="reDrawChart">
                  <Option v-for="item in indexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
          </div>
          <div class="normal-box-bd">
            <div class="profits-bar">
              <div class="echarts"></div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import echartsConfig from 'src/util/echarts'
  import { ajax_get_company_selectbox } from "src/apis/company";
  import { ajaxPostAnalysisPublicdata, ajaxPostAnalysisReportprofit } from "src/apis/analysis";

  export default {
    data () {
      return {
        cityList: [],
        companyIds: [1,2],
        indexList: [],
        modelIndex: ['营业收入','营业利润','净利润'],
        seriesData: [],
        myChart: {}
      }
    },
    methods: {
      init(){        
        const self = this
        this.get_company_select_box_data();
        this.getProfitsIndex();      
        this.reDrawChart()
      },
      reDrawChart(){
        const self = this;
        this.getSeriesData(self.setChart);
      },
      setChart(){
        const self = this;
        this.myChart = echarts.init(document.querySelector('.profits-bar .echarts'));
        let option = {
          tooltip: {},
          legend: {
            data: self.modelIndex,
            y: 'bottom'
          },
          xAxis: {
              data: self.companyNames
          },
          yAxis: {},      
          color: echartsConfig.color,
          series: self.seriesData
        }        
        if (option && typeof option === "object") {
            this.myChart.setOption(option, true);
        }
        echartsConfig.resize(self.myChart)
      },
      keyToValue(companyIds, resourceData){
        let result = [];
        for (var j = 0; j < companyIds.length; j++) {
          for(var i = 0; i < resourceData.length; i++){          
            if(resourceData[i].value == companyIds[j]){
              result.push(resourceData[i].label);
            }
          }
        }
        return result;
      },
      formatBarSeriesData(resourceArr, legendDataArr){
        let result = [];
        for (var i = 0; i < legendDataArr.length; i++) {
          let dataArr = [];
          for (var j = 0; j < resourceArr.length; j++) {
            let itemsArr = resourceArr[j].data
            if (itemsArr.length>0 && itemsArr[i].index_name == legendDataArr[i]) {
              dataArr.push(itemsArr[i].total)
            }else{
              dataArr.push('')
            }
          }
          result.push({ name: legendDataArr[i], type: 'bar',barWidth: 42, data: dataArr })
        }
        return result;
      },
      get_company_select_box_data() {
        const self = this;
        ajax_get_company_selectbox().then(rs => {
          let data = rs.data;
          let result = [];
          data.forEach(function(v) {
            result.push({'value':v.id, 'label':v.name})
          })
          self.cityList = result;
          // self.companyNames = self.keyToValue(self.companyIds, result)
        })
      },
      getProfitsIndex(){
        const self = this;
        let data = {
          "data":{
            "dataType": 1
          }
        }
        ajaxPostAnalysisPublicdata(data).then(rs => {
          const result = rs.data.data;
          result.forEach(function(v){
            self.indexList.push({'value':v.dataIndexName,'label':v.dataIndexName})
          })
        })
      },
      getSeriesData(callback){
        const self = this;
        let data = {
          "data":{
            "indexNames": self.modelIndex.join(','),
            "companyIds": self.companyIds.join(','),
            "type": 1
          }
        }
        ajaxPostAnalysisReportprofit(data).then(rs => {
          let data = rs.data;
          if (data.length>0) {
            self.seriesData = self.formatBarSeriesData(data, self.modelIndex)
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
        return this.keyToValue(self.companyIds, self.cityList)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .profits-bar{
    height: 500px;
    .echarts{
      width: 100%;
      height: 100%;
    }
  }
</style>
