/**
 * @author dongweiliang
 * @email dongweiliang@gmail.com
 * @create date 2017-10-26 03:00:00
 * @modify date 2017-10-26 03:00:00
 * @desc auth登录，设置、获取、清除token
*/

import VueCookie from 'vue-cookie';
const TokenKey = 'token'

export function get_token() {
    return VueCookie.get(TokenKey)
}

export function set_token(token) {
    return VueCookie.set(TokenKey, token)
}

export function remove_token() {
    return VueCookie.delete(TokenKey)
}
