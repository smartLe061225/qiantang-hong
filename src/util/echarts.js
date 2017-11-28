import { ajaxPostAnalysisPublicData } from "src/apis/analysis";
import { ajax_get_company_selectbox } from "src/apis/company";

const echartsConfig = {
  color: ['#00c35c','#0e7ccf','#ffd900','#b7a3df','#e55e7e','#ffc0c0','#ff9a23','#f1c2e6','#f8c66e','#26a9e6','#8be0db','#ff6b08'],
  // mouth: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  mouth: ['2017-01','2017-02','2017-03','2017-04','2017-05','2017-06','2017-07','2017-08','2017-09','2017-10','2017-11','2017-12'],
  setColor(params){
    return this.color[params];
  },
  resize(obj){
    window.addEventListener('resize', function() {
      obj.resize()
    }.bind(this))
  },
  filterDateArr: [{value: 1,label: '当月余额'},{value: 2,label: '本年累计'}],
  pieChartOptions(params){
    let self = this;
    let legendType = params.type ? params.type : 'vertical';
    let legendOptions = {}
    switch(legendType){
      case 'vertical':
        legendOptions = { data: params.legendData, orient: 'vertical',x: 'left' }
        break;
      case 'horizontal':
        legendOptions = { data: params.legendData, orient: 'horizontal', y:'bottom'}
        break;
    }
    let options = {
      tooltip: {
        trigger: 'item', formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: legendOptions,
      itemStyle: { 
        normal:{ color: function (param){ return self.setColor(param.dataIndex) } }
      },
      series: [{
        name:params.seriesName,
        type:'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        label: {
          normal: { show: false, position: 'center' },
          emphasis: { show: true, textStyle: { fontSize: '26', fontWeight: 'bold' } }
        },
        labelLine: { normal: { show: false } },
        data: params.seriesData
      }]
    }
    return options;
  },
  barChartOptions(params){
    let options = {
      tooltip: {},
      legend: {
        data: params.legendData,
        y: 'bottom'
      },
      xAxis: {
        data: params.xAxis
      },
      yAxis: {},
      color: echartsConfig.color,
      series: params.seriesData
    }
    return options;
  },
  lineChartOption(params){
    let options = {
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:[],
        y: 'bottom'
      },
      xAxis : [
        {
          type : 'category',
          data : this.mouth
        }
      ],
      yAxis : [{ type : 'value' }],
      color: echartsConfig.color,
      series : params.seriesData
    }
    return options;
  },
  getProfitsIndex(type){
    let data = {
      "data":{
        "dataType": type
      }
    }
    let results = [];
    ajaxPostAnalysisPublicData(data).then(rs => {
      let result = rs.data.data;
      result.forEach(function(v){
        results.push({'value':v.dataIndexName,'label':v.dataIndexName})
      })
    })
    return results;
  },
  getCompanyData(){
    let result = [];
    ajax_get_company_selectbox().then(rs => {
      if (rs.status == 'success') {
        let data = rs.data;
        data.forEach(function(v) {
          result.push({'value':v.id, 'label':v.name})
        })
      }else{
        alert(rs.message)
      }
    })
    return result;
  }
}

export default echartsConfig;