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
        url: "/api/company",
        method: 'post',
        data
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
