import Vue from 'vue'
import Vuex from 'vuex'
import {
    get_token,
    set_token,
    remove_token
} from '../util/auth';
import { Login } from '../apis/user'
import { Message } from 'iview'
import { ajax_get_company_selectbox } from "../apis/company";


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
        company_list_data: [],
        token: get_token()
    },
    getters: {
        token: state => {
            return state.token
        },
        company_list_data: state => {
            return state.company_list_data
        }
    },
    mutations: {
        SET_CURRENT_PATH: (state, current_path) => {
            state.current_path = current_path;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_COMPANY_LIST_DATA: (state, company_list_data) => {
            state.company_list_data = company_list_data;
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
                    if (data.status == 'error') {
                        Message.error(data.message);
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
            remove_token();
        },
        // 获取公司列表
        store_get_companies({
            commit
        }) {
            return new Promise((resolve, reject) => {
                ajax_get_company_selectbox().then(response => {
                    const data = response;
                    if (data.status == 'error') {
                        Message.error(data.message);
                    } else {
                        commit('SET_COMPANY_LIST_DATA', data.data);
                        resolve(data.data);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
});

export default store