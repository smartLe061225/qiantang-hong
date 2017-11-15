# qt_hong

> A qiantan hong project with vue.js

## 前端技术栈
| 说明 | 备注 | 说明 | 备注 |
|--------|--------|--------|--------|
|  MVVM框架 |  [vue.js](https://cn.vuejs.org) | 组件库 | [iview](https://www.iviewui.com) |
| 路由 |  [vue-router](https://router.vuejs.org) | 图表插件 | [ECharts](http://echarts.baidu.com) |
| 状态管理 | [vuex](https://vuex.vuejs.org) | less | [less](http://lesscss.cn) |
| AJAX请求 | [axios](https://github.com/axios/axios) | localStorage | localStorage |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

***

# API接口

### 登陆
* 接口地址：`http://192.168.31.8:8762/api/jwt/token`
* 传参json格式（application/json，post请求）：
```javascript
{
    "username":"admin",
    "password":"admin"
}
```
* 返回结果：
```javascript
{
    "status": "success",
    "message": "ok",
    "data": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjEiLCJuYW1lIjoiTXIuQUciLCJleHAiOjE1MTA2NDIxMTh9.Hxe8Y978K_E2-Uo_jf01NuQTbX0GtHsdBTfjEQ_7iQCSSJt6duNBLvjv4cLlM8GQ6KTQrle5Y6vEgMRVOs_ctokTbeoUV_DxGR9607-HfMxt-niswqGFnFHdz-Orpqj_U40KdzdDk0_dKbQUxCJc_i793XroCnaGT4iV08QrD5s"
}
```
data为token


### 注册用户-获取手机验证码
* 接口地址：`http://192.168.31.8:8762/api/register/code`
* 传参json格式（application/json，post请求）：
```javascript
{
	"phone":"13986143361"
}
```
* 返回结果：
```javascript
{
    "status": "success",
    "message": "ok",
    "data": "973964"
}
```
data为验证码

### 注册用户动作
* 接口地址：`http://192.168.31.8:8762/api/register/submit`
* 传参json格式（application/json，post请求）：
```javascript
{
	"data":{
    	"username":"lixin",
        "password":"123456",
        "phone":"13986143361",
        "code":456789
     }
}
```
* 返回结果：
```javascript
{
    "status": "success",
    "message": "ok"
}
```

header  添加token键值对     key：Authorization，value:token值

