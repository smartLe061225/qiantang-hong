import fetch from 'src/util/fetch';

/**
 * 登录
 **/
export const Login = (params) => fetch('/api/userinfo/wxLogin', params)
