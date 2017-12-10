/**
 * 方法说明： 把数据处理成 echarts-柱状图 所需的数组格式
 * @method formatBarSeriesData
 * @param {array}   resourceArr,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const formatBarSeriesData = (resourceArr, legendDataArr) => {
  let result = [];
  for (let i = 0; i < legendDataArr.length; i++) {
    let dataArr = [];
    for (let j = 0; j < resourceArr.length; j++) {
      let itemsArrData = resourceArr[j].data;            
      if (itemsArrData.length>0) {
        for (let k = 0; k < itemsArrData.length; k++) {
          if(itemsArrData[k].index_name == legendDataArr[i]){
            dataArr.push(itemsArrData[k].total)
          }
        }              
      }else{
        dataArr.push('')
      }
    }
    result.push({ name: legendDataArr[i], type: 'bar',barWidth: 42, data: dataArr })
  }
  return result;
}

/**
 * 方法说明： 把数据处理成 echarts-柱状图 所需的数组格式
 * @method formatBarSeriesData
 * @param {array}   resourceArr,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const formatPieSeriesData = (resourceArr, legendDataArr) => {
  let itemsArrData = resourceArr.data
  let result = [];
  for (let i = 0; i < legendDataArr.length; i++) {
    if (itemsArrData.length>0) {
      for (let j = 0; j < itemsArrData.length; j++) {
        if(itemsArrData[j].index_name == legendDataArr[i]){
          result.push({name: legendDataArr[i], value: itemsArrData[j].total})
        }
      }
    }else{
      result.push('')
    }
  }
  return result;
}

/**
 * 方法说明： 通过 公司ID(companyIds) 返回 对应公司名(result)
 * @method getCompanyName
 * @param {array}   companyIds, 公司ID
 * @param {array}   resourceData, 包含公司ID和公司名的数组
 * @return {array}
 */
export const getCompanyName = (companyIds, resourceData) => {
  let result = [];
  for (let i = 0; i < companyIds.length; i++) {
    for(let j = 0; j < resourceData.length; j++){          
      if(resourceData[j].value == companyIds[i]){
        result.push(resourceData[j].label);
      }
    }
  }
  return result;
}

/**
 * 方法说明： 通过 公司ID(companyIds) 返回 对应公司名(result)
 * @method getCompanyName
 * @param {array}   companyIds, 公司ID
 * @param {array}   resourceData, 包含公司ID和公司名的数组
 * @return {array}
 */
export const getCompanyID = (companyName, resourceData) => {
  let result = [];
  for (let i = 0; i < companyName.length; i++) {
    for(let j = 0; j < resourceData.length; j++){          
      if(resourceData[j].label == companyName[i]){
        result.push(resourceData[j].value);
      }
    }
  }
  return result;
}
/**
 * 方法说明： 格式化年月日
 * @method getCompanyName
 * @param {string}   date, 'Sun Jan 01 2017 00:00:00 GMT+0800 (China Standard Time)''
 * @return {string}  2017-11
 */
export const getFormattedMonth = (date) => {
  let d = new Date(date);
  return d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-01";
}

/**
 * 方法说明： 通过 格式化年月
 * @method getCompanyName
 * @param {string}   date, 'Sun Jan 01 2017 00:00:00 GMT+0800 (China Standard Time)''
 * @return {string}  2017-11
 */
export const cutDate = (date) => {
  let d = new Date(date);
  return date.substring(0,7);
}

/**
 * 方法说明：生成:1~12月，格式如：2017-01
 * @method createTime
 * @param {string} year
 * @return {array} ["2017-01", "2017-02", ... , "2017-12"]
 */
export const createTime = (year) => {
    let Year = year ? year : new Date().getFullYear(); // 2017
    let time = [];
    let mouthLength = 12;
    for (let i = 1; i < mouthLength+1; i++) {
        let j = i<10 ? '0'+i : i;
        time.push(Year+'-'+j)
    }
    return time;
}

/**
 * 方法说明：数组间隔合并，并过滤空数组
 * @method intervalMergeArray
 * @param {array} Arr1 , 如：[1,3,5,7,9]
 * @param {array} Arr2 , 如：[2,4,6,8,10]
 * @return {array} 返回，如：[1,2,3,4,5,6,7,8,9,10]
 */
export const intervalMergeArray = (Arr1, Arr2) => {
    let result = []
    for (let i = 0; i < Arr1.length; i++) {
        result[2*i] = Arr1[i]
    }
    for (let i = 0; i < Arr2.length; i++) {
        result[2*i+1] = Arr2[i]
    }
    return result.filter(t => t !== undefined && t !== null);
}

/**
 * 方法说明：过滤空数组
 * @method intervalMergeArray
 * @param {array} array , 如：[1,2,3,4,,,5]
 * @return {array} 返回，如：[1,2,3,4,5]
 */
export const removeEmptyArray = (array) => {
    return array.filter(t => t !== undefined && t !== null); // ES6
}

/* 方法说明：从数据源从，按照传入公司ID的顺序获取对应数据
 * @method getCompanyData
 * @param {object} data，源数据
 * @param {array} companyIdArr，公司ID的数组 [1,2]
 * @return {object} 对应公司数据结果
 */
export const getCompanyData = (data, companyIdArr) => {
    let results = [];
    if (companyIdArr && companyIdArr instanceof Array) {
      for (let i = 0; i < companyIdArr.length; i++) {
          for (let j = 0; j < data.length; j++) {
              if (data[j][companyIdArr[i]]) {
                  results.push(data[j][companyIdArr[i]].index);
              }
          }
      }
    }
    return results;
}

/* 方法说明：数据转换，根据公司ID，指标类型，具体年月获取所需要数据
 * @method convertData
 * @param {object} data，源数据
 * @param {array} companyIdArr，公司ID的数组 [1,2]
 * @param {array} indexArr，指标的数组 ['无形资产','固定资产清理']，不传则获取所有数据源中指标
 * @param {array} mouthArr，月份的数组 ['2017-01',2017-11']，不传则获取当前客户端本年度1~12月
 * @return {object} 对应公司数据结果
 */
export const convertData = (data, companyIdArr, indexArr, mouthArr) => {
    let mouth = mouthArr ? mouthArr : createTime();
    let myIndex = indexArr ? indexArr : new Array();
    let results = []
    for (let i = 0; i < data.length; i++) {
        let result = []
        for (let j = 0; j < mouth.length; j++) {
            let dataArr = [];
            for (let k = 0; k < data[i].length; k++) {
                if (data[i][k].report_time.substring(0,7) == mouth[j]) {
                    if (myIndex.length) {
                        for (let m = 0; m < myIndex.length; m++) {
                            if (myIndex[m] == data[i][k].index_name) {
                                dataArr.push({ 'index_name': data[i][k].index_name, 'total': data[i][k].total })
                                break;
                            }
                        }
                    }else{
                        dataArr.push({ 'index_name': data[i][k].index_name, 'total': data[i][k].total })
                    }
                }
            }
            result.push({'mouth':mouth[j].substring(0,7), 'data': dataArr})
        }
        results.push({'companyid':companyIdArr[i],'data':result})
    }
    return results;
}

/* 方法说明：这其实是上面几个函数的拼装。。。
 * @method convertResourceData
 * @param {object} data，源数据
 * @param {array} companyIdArr，公司ID的数组 [1,2]
 * @param {array} indexArr，指标的数组 ['无形资产','固定资产清理']，不传则获取所有数据源中指标
 * @param {array} mouthArr，月份的数组 ['2017-01',2017-11']，不传则获取当前客户端本年度1~12月
 * @return {object} 对应公司数据结果
 */
export const convertResourceData = (data, companyIdArr, indexArr, mouthArr) => {
    return convertData(getCompanyData(data, companyIdArr), companyIdArr, indexArr, mouthArr)
}

/* 方法说明：线状图表数据
 * @method getLineChartSeriesData
 * @param {object} data，源数据
 * @param {array} companyNameArr，麻烦您稍待传一下name的值 ['武汉中润','钱塘大数据交易中心']
 * @return {object} 返回线型图表所需数据
 */
export const getLineChartSeriesData = (resource, companyNameArr) => {
    let result = [];
    if (companyNameArr && companyNameArr instanceof Array) {
      for (let i = 0; i < resource.length; i++) {
          let dataArr = []
          let rs = resource[i].data;
          for (let j = 0; j < rs.length; j++) {
              if(rs[j].data[0]){
                  dataArr.push(rs[j].data[0].total)
              }else{
                  dataArr.push('')
              }
          }
          
          result.push({name: companyNameArr[i], type: 'line', data: dataArr})
      }
    }
    return result;
}

/**
 * 方法说明： 把数据处理成 echarts-柱状图 所需的数组格式
 * @method formatBarSeriesData
 * @param {array}   resourceArr,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const getPieChartSeriesData = (resourceArr, legendDataArr) => {
  let resourceData = resourceArr[0].data[0].data
  let result = [];
  for (let i = 0; i < legendDataArr.length; i++) {    
    for (let j = 0; j < resourceData.length; j++) {
      if(resourceData[j].index_name == legendDataArr[i]){
        result.push({name: legendDataArr[i], value: resourceData[j].total})
      }else{
        result.push({name: legendDataArr[i], value: '-'})
      }
    }
  }
  return result;
}

/**
 * 方法说明： 把数据处理成 echarts-柱状图 所需的数组格式
 * @method formatBarSeriesData
 * @param {array}   resourceArr,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const getPie2ChartSeriesData = (resourceArr, legendDataArr) => {
  let resourceData = resourceArr[0].data[0].data
  let result = [];
  for (let i = 0; i < legendDataArr.length; i++) {
    var flag = false;
    for (let j = 0; j < resourceData.length; j++) {
      if(resourceData[j].index_name == legendDataArr[i]){
        result.push({name: legendDataArr[i], value: resourceData[j].total});
        flag = true;
        break;
      }
    }
    if(!flag){
      result.push({name: legendDataArr[i], value: '-'});
    }
  }
  return result;
}

/* 方法说明：线状图表数据
 * @method getBarChartSeriesData
 * @param {object} data，源数据
 * @param {array} companyNameArr，麻烦您稍待传一下name的值 ['武汉中润','钱塘大数据交易中心']
 * @return {object} 返回线型图表所需数据
 */
export const getBarChartSeriesData = (resource, indexArr) => {
    let result = [];
    if (indexArr && indexArr instanceof Array) {
      for (let i = 0; i < resource.length; i++) {
          let dataArr = []
          let rs = resource[i].data;
          for (let j = 0; j < rs.length; j++) {
              if(rs[j].data[0]){
                  dataArr.push(rs[j].data[0].total)
              }else{
                  dataArr.push('')
              }
          }
          result.push({name: indexArr[i], type: 'bar', data: dataArr})
      }
    }
    return result;
}

/* 方法说明：线状图表数据
 * @method getLine4ChartSeriesData
 * @param {object} data，源数据
 * @param {array} companyNameArr，麻烦您稍待传一下name的值 ['武汉中润','钱塘大数据交易中心']
 * @return {object} 返回线型图表所需数据
 */
export const getLine4ChartSeriesData = (resource, indexArr) => {
    let result = [];
    if (indexArr && indexArr instanceof Array) {
      for (let i = 0; i < resource.length; i++) {
          let dataArr = []
          let rs = resource[i].data;
          for (let j = 0; j < rs.length; j++) {
              if(rs[j].data[0]){
                  dataArr.push(rs[j].data[0].total)
              }else{
                  dataArr.push('')
              }
          }
          result.push({name: indexArr[i], type: 'line', itemStyle: {normal: {areaStyle: {type: 'default'}}}, data: dataArr})
      }
    }
    return result;
}

/**
 * 方法说明： 现金分析 弹层 现金流出小计
 * @method getbar8OutputChartSeriesData
 * @param {array}   resourceArr,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const getbar8OutputChartSeriesData = (resourceArr, indexArr) => {
  let resourceData = resourceArr[0].data[0].data
  let result = [];
  for (let i = 0; i < indexArr.length; i++) {
    var flag = false;
    for (let j = 0; j < resourceData.length; j++) {
      if(resourceData[j].index_name == indexArr[i]){
        result.push({value: (resourceData[j].total * -1), itemStyle:{normal: {label : {position: 'right'}}}});
        flag = true;
        break;
      }
    }
    if(!flag){
      result.push({value: (resourceData[j].total * -1), itemStyle:{normal: {label : {position: 'right'}}}});
    }
  }
  return result;
}

/**
 * 方法说明： 现金分析 弹层 现金流入小计
 * @method getbar8InputChartSeriesData
 * @param {array}   resourceArr,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const getbar8InputChartSeriesData = (resourceArr, indexArr) => {
  let resourceData = resourceArr[0].data[0].data
  let result = [];
  for (let i = 0; i < indexArr.length; i++) {
    var flag = false;
    for (let j = 0; j < resourceData.length; j++) {
      if(resourceData[j].index_name == indexArr[i]){
        result.push({value: resourceData[j].total, itemStyle:{normal: {label : {position: 'left'}}}});
        flag = true;
        break;
      }
    }
    if(!flag){
      result.push({value: resourceData[j].total, itemStyle:{normal: {label : {position: 'left'}}}});
    }
  }
  return result;
}

/**
 * 方法说明： 预警分析
 * @method getWarningSeriesData
 * @param {array}   resourceData,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const getWarningSeriesData = (resourceData, legendDataArr, echartType) => {
  let result = [];
    for (var i = 0; i < resourceData.length; i++) {
      result.push({name:legendDataArr[i], type: echartType? echartType: 'line', data: resourceData[i].series_data})
    }    
  return result;
}

/**
 * 方法说明： 首页 多个公司收支变化趋势
 * @method getBalanceSeriesData
 * @param {array}   resourceData,服务器返回数据结果
 * @param {array}   legendDataArr, 指标，格式如：['营业收入','营业利润','净利润']
 * @return {array}
 */
export const getBalanceSeriesData = (resourceData, legendDataArr, echartType) => {
  let result = [];
  for (var i = 0; i < legendDataArr.length; i++) {
    result.push({name:legendDataArr[i], type: echartType? echartType: 'line', data: resourceData[i].data})
  }
  return result;
}

/**
 * 方法说明： 获取键名
 * @method getCheckboxLable
 * @param {array}   data, 待处理数据，格式如： [{label: '值一',value: 1}, {label: '值二', value: 2}]
 * @return {array} result, 返回结果如： ['值一','值二']
 */
export const getCheckboxLable = (data) => {
  var result = []
  if (data && data instanceof Array){
    for (var i = 0; i < data.length; i++) {
      result.push(data[i].label)
    }
  }
  return result;
}

/**
 * 方法说明： 获取键值
 * @method getCheckboxIndex
 * @param {array}   data, 待处理数据，格式如： [{label: '值一',value: 1}, {label: '值二', value: 2}]
 * @return {array} result, 返回结果如： [1,2]
 */
export const getCheckboxValue = (data) => {
  var result = []
  if (data && data instanceof Array){
    for (var i = 0; i < data.length; i++) {
      result.push(data[i].value)
    }
  }
  return result;
}

/**
 * 方法说明： 获取当前 键名
 * @method getCurrentLable
 * @param {array}   value, 待传入数组，如： [1]
 * @param {array}   data, 数据源，格式如： [{label: '值一',value: 1}, {label: '值二', value: 2}]
 * @return {array} 返回结果，如：['值一']
 */
export const getCurrentLable = (value, data) => {
  let result = [];
  for (let i = 0; i < value.length; i++) {
    for(let j = 0; j < data.length; j++){          
      if(data[j].value == value[i]){
        result.push(data[j].label);
      }
    }
  }
  return result;
}

/**
 * 方法说明： 获取当前 键值
 * @method getCurrentValue
 * @param {array}   label, 待传入数组，如： ['值一']
 * @param {array}   data, 数据源，格式如： [{label: '值一',value: 1}, {label: '值二', value: 2}]
 * @return {array} 返回结果，如：[1]
 */
export const getCurrentValue = (label, data) => {
  let result = [];
  for (let i = 0; i < label.length; i++) {
    for(let j = 0; j < data.length; j++){          
      if(data[j].label == label[i]){
        result.push(data[j].value);
      }
    }
  }
  return result;
}

/**
 * 方法说明： 获取当前 键值
 * @method getCurrentValue
 * @param {array}   label, 待传入数组，如： ['值一']
 * @param {array}   data, 数据源，格式如： [{label: '值一',value: 1}, {label: '值二', value: 2}]
 * @return {array} 返回结果，如：[1]
 */
export const getLine2seriesData = (legendData, legendValue, resourceData) => {
  let result = [];
  for (var i = 0; i < legendData.length; i++) {
    if (i==0) {
      result.push({name: legendData[i], type: 'line', data: resourceData[legendValue[i]], markPoint: {data: [ {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}]} })
    }else{
      result.push({name: legendData[i], type: 'line', data: resourceData[legendValue[i]]})
    }
  }
  return result;
}

/**
 * 方法说明： 格式化 为人民币，并保留后两位小数，如：100元，100万元，100亿元，100万亿元
 * @method getCurrentValue
 * @param {array}   label, 待传入数组，如： ['值一']
 * @param {array}   data, 数据源，格式如： [{label: '值一',value: 1}, {label: '值二', value: 2}]
 * @return {array} 返回结果，如：[1]
 */
export const transformValue = (value) => {
    let endVal = 0;
    let unit = '';
    let flag = value < 0 ? true : false;
    let val = Math.abs(value)
    if (val < 10000) {
        endVal = val;
        unit = '元';
    } else if (val >= 10000 && val < 100000000) {
        endVal = val / 10000;
        unit = '万元';
    } else if (val >= 100000000 && val < 100000000000000) {
        endVal = val / 100000000;
        unit = '亿元';
    } else {
        endVal = val / 100000000000000;
        unit = '万亿元';
    }
    return (flag ? (endVal.toFixed(2)*-1) : endVal.toFixed(2)) + unit;
}
