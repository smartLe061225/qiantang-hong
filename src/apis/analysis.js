/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-11-15 10:47:07
 * @modify date 2017-11-15 10:47:07
 * @desc 分析模块相关接口
*/
import fetch from 'src/util/fetch';

/**
 * 获取利润分析数据
 */
export function ajax_get_profits(query) {
    return fetch({
        url: "/api/profits",
        method: 'get',
        params: query
    })
}

/**
 * 上传利润分析数据
 */
export function ajax_post_profits(data) {
    return fetch({
        url: "/api/profits",
        method: 'post',
        data
    })
}

/* 获取分析(利润分析)列表 */
export const ajaxPostAnalysisReportprofit = (data) => fetch({ url: '/api/reportprofit/list', method: 'post', data })

/* 获取分析(资产分析)列表 */
export const ajaxPostAnalysisReportAssets = (data) => fetch({ url: '/api/reportassets/list', method: 'post', data })

/* 获取分析(现金分析)列表 */
export const ajaxPostAnalysisReportCashflow = (data) => fetch({ url: '/api/reportcashflow/list', method: 'post', data })

/* 获取分析指标 */
export const ajaxPostAnalysisPublicData = (data) => fetch({ url: '/api/publicdata/list', method: 'post', data })

/* 获取分析导入列表 */
export const ajaxPostAnalysisReportRecord = (data) => fetch({ url: '/api/reportrecord/list', method: 'post', data })

/* 删除分析(利润分析)列表 */
export const ajaxPostAnalysisDelete = (type,data) => fetch({ url: '/api/' + type + '/delete', method: 'post', data })

/* 删除分析(利润分析)列表 */
export const ajaxPostAnalysisUpload = (type,data) => fetch({ url: '/api/' + type + '/upload', method: 'post', data })

/* 资产分析指标 */
export const ajaxPostAssetsIndex = (data) => fetch({ url: '/api/reportassets/typeList', method: 'post', data })

/* 资产分析数据 */
export const ajaxPostAssetsData = (data) => fetch({ url: '/api/reportassets/dataList', method: 'post', data})