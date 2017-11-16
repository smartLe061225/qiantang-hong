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
