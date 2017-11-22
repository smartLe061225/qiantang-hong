/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-11-15 10:47:07
 * @modify date 2017-11-15 10:47:07
 * @desc 公司管理模块相关接口
*/
import fetch from '@/util/fetch';

/**
根据公司ID获取所有部门信息
 */
export function ajax_get_deparment_by_company_id(data) {
    return fetch({
        url: "/api/department/infos",
        method: 'post',
        data: { data: data}
    })
}

/**
新增部门
 */
export function ajax_post_department(data) {
    return fetch({
        url: "/api/department/update",
        method: 'post',
        data: { data: data }
    })
}