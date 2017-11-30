/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-11-15 10:47:07
 * @modify date 2017-11-15 10:47:07
 * @desc 公司管理模块相关接口
*/
import fetch from '@/util/fetch';

/**
 * 新增公司
 * {
  "data": {
    "address": "string",
    "area": "string",
    "city": "string",
    "companyImg": "string",
    "createId": 0,
    "createName": "string",
    "createTime": "2017-11-15T08:10:35.506Z",
    "enterpriseId": 0,
    "flag": 0,
    "headId": 0,
    "id": 0,
    "name": "string",
    "province": "string",
    "updateTime": "2017-11-15T08:10:35.506Z"
  },
  "message": "string",
  "rel": true,
  "status": 0
}
 */
export function ajax_post_company(data) {
    return fetch({
        url: "/api/company/update",
        method: 'post',
        data: {data: data}
    })
}

/**
 * 获取所有公司
[
  {
    "address": "string",
    "area": "string",
    "city": "string",
    "companyImg": "string",
    "createId": 0,
    "createName": "string",
    "createTime": "2017-11-15T08:10:35.520Z",
    "enterpriseId": 0,
    "flag": 0,
    "headId": 0,
    "id": 0,
    "name": "string",
    "province": "string",
    "updateTime": "2017-11-15T08:10:35.520Z"
  }
]

 */
export function ajax_get_company_all() {
    return fetch({
        url: "/api/company/all",
        method: 'get'
    })
}

/**
 * 获取所属公司列表
 */
export function ajax_get_company_selectbox() {
    return fetch({
        url: "/api/company/selectbox",
        method: 'get'
    })
}

/**
 * 获取地区列表
 */
export function ajax_get_area(data) {
    return fetch({
        url: "/api/area/get",
        method: 'post',
        data: {data:data}
    })
}

/**
 * 删除公司
 */
export function ajax_del_company(data) {
    return fetch({
        url: "/api/company/delete",
        method: 'post',
        data: { data: data }
    })
}

/**
 * 添加认证
 */
export function ajax_post_enterprise(data) {
    return fetch({
        url: "/api/enterprise/update",
        method: 'post',
        data: { data: data }
    })
}

/**
 * 获取认证信息
 * @param {*} data 
 */
export function ajax_get_enterprise_info() {
    return fetch({
        url: "/api/enterprise/info",
        method: 'get',
    })
}

/* 首页 组织架构 */
export const ajaxGetOrganizationalData = (params) => fetch({ url: '/api/user/organizational', method: 'get', params })

/* 首页 指标卡 */
export const ajaxGetIndexCardData = (params) => fetch({ url: '/api/reportrecord/indexcardcata', method: 'get', params })