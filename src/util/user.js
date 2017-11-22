/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-10-26 03:00:00
 * @modify date 2017-10-26 03:00:00
 * @desc 当前登录用户的信息
*/

import VueCookie from 'vue-cookie';

export function get_enterprise_name() {
    return VueCookie.get('enterprise_name')
}

export function set_enterprise_name(enterprise_name) {
    return VueCookie.set('enterprise_name', enterprise_name)
}

export function remove_enterprise_name() {
    return VueCookie.delete('enterprise_name')
}

export function get_enterprise_type() {
    return VueCookie.get('enterprise_type')
}

export function set_enterprise_type(enterprise_type) {
    return VueCookie.set('enterprise_type', enterprise_type)
}

export function remove_enterprise_type() {
    return VueCookie.delete('enterprise_type')
}

export function get_user_info() {
    return JSON.parse(VueCookie.get('user_info'))
}

export function set_user_info(user_info) {
    return VueCookie.set('user_info', JSON.stringify(user_info))
}

export function remove_user_info() {
    return VueCookie.delete('user_info')
}
