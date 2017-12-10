import { Message } from 'iview';
import { ajaxPostAnalysisPublicData } from "src/apis/analysis";
import { ajax_get_company_selectbox } from "src/apis/company";
import chart_option_event from "src/util/chart_option_event";
import { transformValue } from "src/util/tools"

const echartsConfig = {
  // color: ['#00c35c','#0e7ccf','#ffd900','#b7a3df','#e55e7e','#ffc0c0','#ff9a23','#f1c2e6','#f8c66e','#26a9e6','#8be0db','#ff6b08'],
  color: ["#0087f1","#3ea3f5","#00b7f1","#00cdf1","#00d3d7","#00b3cd","#00c59f","#00bb54","#009d0e","#87bb00","#a3e100","#f3db18"],
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
  // 格式化 饼状图浮动提示
  formatPieTooltip(params) {
    let html = '';
    if(params){
      html = '<font color="'+params.color+'">'+params.name+'：<br/>'+ transformValue(params.value) + '(' + params.percent + '%)</font>';
    }
    return html
  },
  // 格式化 线型图浮动提示
  formatLineTooltip(params){
    let html = [];
    if(params){
      let font = [];
      for(let i = 0 ;i <params.length;i++){
        let _font = '<font color="' + params[i].color + '">' + params[i].seriesName + '：' + transformValue(params[i].value) + '</font>';
        font.push(_font);
      }
      html.push(font.join("<br/>"));
    }
    return html.join("");
  },
  // 格式化 百分比 浮动提示
  formatPercentTooltip(params){
    let html = [];
    if(params){
      let font = [];
      for(let i = 0 ;i <params.length;i++){
        let _font = '<font color="'+ params[i].color+ '">' + params[i].seriesName + '：' + params[i].value + '%</font>';
        font.push(_font);
      }
      html.push(font.join("<br/>"));
    }
    return html.join("");
  },
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
      title: { 
        text: params.title ? params.title : '',
        x: 'center'
      },
      legend: {
        data: params.legendData ? params.legendData : '',
        y: 'bottom'
      },
      xAxis: {
        data: params.xAxis ? params.xAxis : this.mouth
      },
      yAxis : [
        {
            type : 'value'
        }
      ],
      color: params.color ? params.color : echartsConfig.color,
      series: params.seriesData
    }
    return options;
  },
  bar8ChartOptions(params){
    // http://echarts.baidu.com/echarts2/doc/example/bar15.html
    let options = {
      title: {
        text: params.title ? params.title : '',
        left: 'center',
        textStyle: { fontWeight: 'normal', color: '#a9aaaf' }
      },
      tooltip : { trigger: 'axis', formatter: "{b}：<br/> {c}", axisPointer : { type : 'shadow' } },
      xAxis : [{ type : 'value',position: 'bottom',splitLine: {lineStyle:{type:'dashed'}} }],
      yAxis : [{type: 'category',axisLine: {show: false},axisLabel: {show: false},axisTick: {show: false},splitLine: {show: false}, data : params.yAxis}],
      series : [
        {
          type:'bar',
          itemStyle : { normal: {
              color: function (param){ return echartsConfig.setColor(param.dataIndex) },
              borderRadius: 5, label : {show: true, position: 'left',formatter: '{b}'}
          }},
          data: params.seriesData
        }
      ]
    };
    return options;
  },
  bar15ChartOptions(params){
    // http://echarts.baidu.com/echarts2/doc/example/bar15.html
    let options = {
      title: { text: params.title ? params.title : '' },
      tooltip: {},
      calculable: true,
      xAxis: [{
        type: 'category', data: params.xAxis ? params.xAxis : this.mouth
      }],
      yAxis: [{ type: 'value' }],
      itemStyle: { normal:{ color: function (param){ return echartsConfig.setColor(param.dataIndex) } }},
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
        data: params.legendData? params.legendData: []
      },
      xAxis : [
        {
          type : 'category',
          data : params.xAxis ? params.xAxis : this.mouth,
        }
      ],
      yAxis : [{ type : 'value' }],
      color: echartsConfig.color,
      series : params.seriesData
    }
    return options;
  },
  line2ChartOption(params){
    let options = {
      title:{
        text: params.title ? params.title : '',
        left: 'center',
        textStyle: { fontWeight: 'normal', color: '#a9aaaf' }
      },
      tooltip : {
        trigger: 'axis',
        backgroundColor: '#fff',
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
      },
      legend: {
        data: params.legendData? params.legendData: [],
        orient: 'horizontal', 
        y:'bottom'
      },
      xAxis : [
        {
          type : 'category',
          data : params.xAxis ? params.xAxis : this.mouth,
        }
      ],
      yAxis : [ { type : 'value' } ],
      color: params.color ? params.color : echartsConfig.color,
      series : params.seriesData
    }
    options.tooltip.formatter = function (param) {
      return echartsConfig.formatLineTooltip(param)
    }
    return options;
  },
  lineChartOptionPercent(params){
    let options = {
      tooltip : {
        trigger: 'axis',
        backgroundColor: '#fff',
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
      },
      legend: {
        data: params.legendData? params.legendData: []
      },
      xAxis : [
        {
          type : 'category',
          data : params.xAxis ? params.xAxis : this.mouth,
        }
      ],
      yAxis : {
        type : 'value',
        axisLabel: { formatter: '{value}%' } 
      },
      color: echartsConfig.color,
      series : params.seriesData
    }
    options.tooltip.formatter = function (param) {
      return echartsConfig.formatPercentTooltip(param);
    }
    return options;
  },
  line4ChartOption(params){
    // http://echarts.baidu.com/echarts2/doc/example/line4.html
    let options = {
      tooltip : { trigger: 'axis' },
      calculable : true,
      color: echartsConfig.color,
      xAxis : [ { type : 'category', boundaryGap : false, data : params.xAxis? params.xAxis : this.mouth } ],
      yAxis : [ { type : 'value' } ],
      series : params.seriesData
    };
    return options;
  },
  pie1ChartOptions(params){
    // url: http://echarts.baidu.com/echarts2/doc/example/pie1.html
    let options = {
        tooltip : { trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)" },
        legend: { orient : 'vertical', x : 'left', data: params.legendData },
        calculable : true,
        series : params.seriesData
    }
    return options;
  },
  pie2ChartOptions(params){
    // http://echarts.baidu.com/echarts2/doc/example/pie2.html
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
      tooltip : { trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)" },
      legend: legendOptions,
      calculable : true,
      color: echartsConfig.color,
      series : [
        {
          name: params.seriesName,
          type:'pie', 
          radius : ['50%', '70%'], 
          itemStyle : {
            normal : { 
              label : { show : false }, 
              labelLine : { show : false } 
            },
            emphasis : { 
              label : { 
                show : true, 
                position : 'center', 
                textStyle : { fontSize : '30', fontWeight : 'bold' } 
              } 
            } 
          },
          data: params.seriesData
        }
      ]
    };

    return options;
  },
  pie3ChartOptions(params){
    // url: http://echarts.baidu.com/echarts2/doc/example/pie3.html
    let options = {
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: echartsConfig.color,
      legend: {
          orient : 'vertical', x : 'left', data: params.legendData
      },
      calculable : false,
      series : [
        {
          name:'', type:'pie', selectedMode: 'single', radius : [0, 70], x: '20%',width: '40%',funnelAlign: 'right', itemStyle : { normal : { label : { position : 'inner' }, labelLine : { show : false } } },
          data: params.seriesData
        },
        {
          name:'', type:'pie', radius : [100, 140], x: '60%', width: '35%', funnelAlign: 'left',
          data: params.seriesSubData
        }
      ]
    };
    return options;
  },
  pieCustomOptions(params){
    // http://echarts.baidu.com/demo.html#pie-custom
    let options = {
      title: {
        text: params.title ? params.title : '',
        left: 'center',
        textStyle: { fontWeight: 'normal', color: '#a9aaaf' }
      },
      color: params.color ? params.color : echartsConfig.color,
      tooltip : {
        trigger: 'item',
        backgroundColor: '#fff',
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
        formatter: "{b} : <br>{c} ({d}%)"
      },
      series : [
        {
          name: params.seriesName,
          type:'pie',
          radius : '70%',
          center: ['50%', '50%'],
          data: params.seriesData,
          roseType: 'radius'
        }
      ]
    }
    options.tooltip.formatter = function (param) {
      return echartsConfig.formatPieTooltip(param);
    }
    return options
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
        Message.error(rs.message)
      }
    })
    return result;
  },
  getCompanyList: function(rs){
    if (rs.status == 'success') {
      let data = rs.data;
      let result = [];
      if (data && data instanceof Array) {
        data.forEach(function(v) {
          result.push({'value':v.id, 'label':v.name})
        })
      }
      return result;
    }else{
      Message.error(rs.message)
    }
  },
  getCompanyName: function(rs){
      let result = [];
      rs.forEach(function(v) {
        result.push(v.label)
      })
      return result;
  },
  getIndexList: function(rs){
    if (rs.status == 'success' ) {
      let data = rs.data;
      let result = [];
      if (data.length>0) {
        data.forEach(function(v){
          result.push(v.parentclass)
        })
        return result;
      }
    }else{
      Message.error(rs.message)
    }
  },
  formatyAxis: function(yAxis){
    if(yAxis && yAxis.length > 0){
      for(let i = 0;i < yAxis.length;i++){
        yAxis[i].axisLabel = {
          formatter:function(value){
            return chart_option_event.scaleValueConvert(value);
          }
        };
      }
    }
  },
  formatyAxisPercent: function(yAxis){
    if(yAxis && yAxis.length > 0){
      for(let i = 0;i < yAxis.length;i++){
        yAxis[i].axisLabel = {
          formatter:function(value){
            return chart_option_event.scaleValueConvert(value);
          }
        };
      }
    }
  }
}

export default echartsConfig;