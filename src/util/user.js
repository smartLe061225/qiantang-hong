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

export function get_enterprise_creater_name() {
    return VueCookie.get('enterprise_creater_name')
}

export function set_enterprise_creater_name(enterprise_creater_name) {
    return VueCookie.set('enterpri_id', enterprise_creater_name)
}

export function remove_enterprise_creater_name() {
    return VueCookie.delete('enterprise_creater_name')
}

export function get_enterpri_id() {
    return parseFloat(VueCookie.get('enterpri_id'))
}

export function set_enterpri_id(enterpri_id) {
    return VueCookie.set('enterpri_id', enterpri_id)
}

export function remove_enterpri_id() {
    return VueCookie.delete('enterpri_id')
}

export function get_has_enterprise() {
    if (VueCookie.get('has_enterprise') == 'true'){
        return true
    } else {
        return false
    }
}

export function set_has_enterprise(has_enterprise) {
    return VueCookie.set('has_enterprise', has_enterprise)
}

export function remove_has_enterprise() {
    return VueCookie.delete('has_enterprise')
} 

export function remove_all_cookie() {
    VueCookie.delete('enterpri_id');
    VueCookie.delete('enterprise_name');
    VueCookie.delete('enterprise_type');
    VueCookie.delete('has_enterprise');
    VueCookie.delete('token');
    VueCookie.delete('user_info');
}