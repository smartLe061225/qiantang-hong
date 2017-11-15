/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-11-15 10:47:07
 * @modify date 2017-11-15 10:47:07
 * @desc 分析模块相关接口
*/
import fetch from '@/utils/fetch';

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