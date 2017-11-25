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
  for (var i = 0; i < legendDataArr.length; i++) {
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
 * 方法说明： 格式化年月日
 * @method getCompanyName
 * @param {string}   date, 'Sun Jan 01 2017 00:00:00 GMT+0800 (China Standard Time)''
 * @return {string}  2017-11
 */
export const getFormattedMonth = (date) => {
  var d = new Date(date);
  return d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-01";
}

/**
 * 方法说明： 通过 格式化年月
 * @method getCompanyName
 * @param {string}   date, 'Sun Jan 01 2017 00:00:00 GMT+0800 (China Standard Time)''
 * @return {string}  2017-11
 */
export const cutDate = (date) => {
  var d = new Date(date);
  return date.substring(0,7);
}