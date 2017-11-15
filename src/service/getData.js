import fetch from 'src/util/fetch';

/**
 * 登录
 **/
export const Login = (params) => fetch('/api/jwt/token', params)

/** 注册 **/
export const Join = (params) => fetch('/api/register/submit', params)

/** 发送注册验证码 **/
export const joinSMS = (params) => fetch('/api/register/code', params)

/** 发送 找回密码 验证码 **/
export const forgetSMS = (params) => fetch('/api/register/code', params)

/** 找回密码 **/
export const Forget = (params) => fetch('/api/register/forget', params)