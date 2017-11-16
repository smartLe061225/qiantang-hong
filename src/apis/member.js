/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-11-15 10:47:07
 * @modify date 2017-11-15 10:47:07
 * @desc 公司管理模块相关接口
*/
import fetch from '@/util/fetch';

/**
 * 新增成员
 *
 */
export function ajax_post_member(data) {
    return fetch({
        url: "/api/member",
        method: 'post',
        data
    })
}