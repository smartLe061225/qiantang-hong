import Vue from 'vue'
import Vuex from 'vuex'
import {
    get_token,
    set_token,
    remove_token
} from '../util/auth';
import { Login } from 'src/service/getData'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        current_path: [{
            path: '/dashboard',
            name: 'dashboard',
            meta: {
                title: '管理首页'
            }
        }],
        token: get_token()
    },
    mutations: {
        SET_CURRENT_PATH: (state, current_path) => {
            state.current_path = current_path;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },
    actions: {
        // 登录
        store_login({
            commit
          }, userInfo) {
            commit('SET_TOKEN', '');
            remove_token();
            return new Promise((resolve, reject) => {
                Login(userInfo).then(response => {
                    const data = response;
                    console.log('login', data);
                    if (data.status === 500) {
                        Message({
                            message: '账户或密码错误！',
                            type: 'warning'
                        });
                        return Promise.reject('error');
                    } else {
                        set_token(data.data);
                        commit('SET_TOKEN', data.data);
                        resolve();
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 注销
        store_logout({ commit }) {
            commit('SET_TOKEN', '');
            remove_token() ;
        },
    }
});

export default store