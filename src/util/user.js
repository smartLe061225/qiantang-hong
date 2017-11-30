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
    return VueCookie.set('enterprise_creater_name', enterprise_creater_name)
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

export function get_enterprise_create_img() {
    return VueCookie.get('enterprise_creater_img');
}

export function set_enterprise_create_img(enterprise_creater_img) {
    return VueCookie.set('enterprise_creater_img', enterprise_creater_img)
}

export function remove_enterprise_create_img() {
    return VueCookie.delete('enterprise_creater_img')
}

export function get_has_enterprise() {
    if (VueCookie.get('has_enterprise') == 'true') {
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

export function get_enterprise_logo() {
    return VueCookie.get('enterprise_logo');
}

export function set_enterprise_logo(enterprise_logo) {
    return VueCookie.set('enterprise_logo', enterprise_logo)
}

export function remove_enterprise_logo() {
    return VueCookie.delete('enterprise_logo')
}

export function get_user_img() {
    return VueCookie.get('user_img');
}

export function set_user_img(user_img) {
    return VueCookie.set('user_img', user_img)
}

export function remove_user_img() {
    return VueCookie.delete('user_img')
}

export function get_enterprise_creater_img() {
    return VueCookie.get('enterprise_creater_img');
}

export function set_enterprise_creater_img(enterprise_creater_img) {
    return VueCookie.set('enterprise_creater_img', enterprise_creater_img)
}

export function remove_enterprise_creater_img() {
    return VueCookie.delete('enterprise_creater_img')
}

export function get_has_uploaded() {
    if (VueCookie.get('check_upload_file') == 'true') {
        return true
    } else {
        return false
    }
}

export function set_has_uploaded(checkUploadFile) {
    return VueCookie.set('check_upload_file', checkUploadFile)
}

export function remove_has_uploaded() {
    return VueCookie.delete('check_upload_file')
} 


export function remove_all_cookie() {
    VueCookie.delete('enterpri_id');
    VueCookie.delete('enterprise_name');
    VueCookie.delete('enterprise_type');
    VueCookie.delete('has_enterprise');
    VueCookie.delete('token');
    VueCookie.delete('user_info');
    VueCookie.delete('check_upload_file');
}

// 默认头像
export function default_avator() {
    return [
        '/static/avator/mrtx0.png',
        '/static/avator/mrtx1.png',
        '/static/avator/mrtx2.png',
        '/static/avator/mrtx3.png',
        '/static/avator/mrtx4.png',
        '/static/avator/mrtx5.png',
        '/static/avator/mrtx6.png',
        '/static/avator/mrtx7.png',
        '/static/avator/mrtx8.png',
        '/static/avator/mrtx9.png',
    ]
}

// 默认公司logo
export function default_images() {
    return {
        enterprise_logo: '/static/enterprise_logo.png'
    }
}