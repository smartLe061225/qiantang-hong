import axios from 'axios';
import { Message,LoadingBar } from 'iview';
import { get_token } from "./auth";
import store from "../store/";


// baseURL, 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL.
if (process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = 'http://192.168.31.8:8762';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
}

// 请求超时时间
axios.defaults.timeout = 30000

// axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
axios.interceptors.request.use(config => {
    // LoadingBar.start();
    if (store.getters.token) {
      config.headers['Authorization'] = get_token(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
},error => {
    return Promise.reject(error);
});

// respone拦截器
axios.interceptors.response.use(response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (response.status === 401 || res.status === 40101) {
      LoadingBar.error();
      Message.error('401， 没有权限')
      return Promise.reject('error');
    }
    if (res.status === 40301) {
      LoadingBar.error();
      Message.error('403, 当前用户无相关操作权限！')
      return Promise.reject('error');
    }
    if (response.status !== 200 && res.status !== 200) {
      Message.error(res.message)
      LoadingBar.error();
    } else {
      LoadingBar.finish()
      return response.data;
    }
  },error => {
    Message.error('糟糕，服务器出错了！'+error)
    LoadingBar.error();
    return Promise.reject(error);
  }
);


export default function(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    .then(response => {
        resolve(response);
    }, err => {
        reject(err);
    })
    .catch((error) => {
       reject(error)
    })
  })
}

