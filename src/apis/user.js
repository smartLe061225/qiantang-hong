import fetch from 'src/util/fetch';

/**
 * 登录
 **/
export function Login(data) {
    return fetch({
        url: "/api/jwt/token",
        method: 'post',
        data
    })
}

/** 注册 **/
export const Join = (data) => fetch({ url: '/api/register/submit', method: 'post', data: { data: data } })

/** 发送注册验证码 **/
export const joinSMS = (data) => fetch({ url: '/api/register/code', method: 'post', data: {data: data} })

/** 发送 找回密码 验证码 **/
export const forgetSMS = (data) => fetch({ url: '/api/user/forget/code', method: 'post', data })

/** 找回密码 **/
export const Forget = (data) => fetch({ url: '/api/user/forget/submit', method: 'post', data })

/**
 * 获取登录信息
 **/
export function ajax_get_baseinfo() {
    return fetch({
        url: "/api/user/baseinfo",
        method: 'get',
    })
}

/**
 * 获取用户展示信息
 **/
export function ajax_get_user_front_info() {
    return fetch({
        url: "/api/user/front/info",
        method: 'get',
    })
}

/**
 * 更新用户名
 **/
export function ajax_update_user(data) {
    return fetch({
        url: "/api/user/update",
        method: 'post',
        data: {data: data}
    })
}

/**
 * 修改密码
 **/
export function ajax_put_user_password(data) {
    return fetch({
        url: "/api/user/updpwd",
        method: 'post',
        data: {data: data}
    })
} 

/**
 * 修改用户头像
 **/
export function ajax_put_user_avator(data) {
    return fetch({
        url: "/api/user/updimg",
        method: 'post',
        data: { data: data }
    })
}