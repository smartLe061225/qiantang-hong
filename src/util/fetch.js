import axios from 'axios';
import { Message,LoadingBar } from 'iview';
import { get_token } from "./auth";
import router from '../router/'
import store from "../store/";


// baseURL, 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL.
if (process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = 'http://192.168.31.8:8762';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
}

// 创建axios实例
const service = axios.create({
  timeout: 30000 // 请求超时时间
});

// // 请求超时时间
// axios.defaults.timeout = 30000

// axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
      config.headers['Authorization'] = get_token(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
},error => {
    return Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res_data = response.data;
    return res_data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Message.error('请重新登录!')
          store.dispatch('store_logout');
          router.replace({
            path: '/login',
          });
        case 500:
          Message.error('内部服务器错误!')
      }
    }
    return Promise.reject(error.response.data);
  }
);



export default service;


