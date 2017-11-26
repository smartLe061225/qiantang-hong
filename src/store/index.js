import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie';
import {
    get_token,
    set_token,
    remove_token
} from '../util/auth';
import {
    get_enterprise_name,
    set_enterprise_name,
    remove_enterprise_name,
    get_enterprise_type,
    set_enterprise_type,
    remove_enterprise_type,
    get_user_info,
    set_user_info,
    remove_user_info,
    set_enterprise_creater_name,
    get_enterprise_creater_name,
    set_enterpri_id,
    get_enterpri_id,
    set_has_enterprise,
    get_has_enterprise
} from '../util/user';
import { Login } from '../apis/user'
import { Message } from 'iview'
import { ajax_get_company_selectbox } from "../apis/company";
import { ajax_get_baseinfo } from "../apis/user";


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
        token: get_token(),
        enterprise_name: get_enterprise_name(),
        enterprise_type: get_enterprise_type(),
        user: get_user_info(),
        enterprise_creater_name: get_enterprise_creater_name(),
        enterpri_id: get_enterpri_id(),
        has_enterprise: get_has_enterprise()
    },
    getters: {
        token: state => {
            return state.token
        },
        enterprise_name: state => {
            return state.enterprise_name
        },
        enterprise_type: state => {
            return state.enterprise_type
        },
        user: state => {
            return state.user
        },
        company_list_data: state => {
            return state.company_list_data
        },
        enterprise_creater_name: state => {
            return state.enterprise_creater_name
        },
        enterpri_id: state => {
            return state.enterpri_id
        },
        has_enterprise: state => {
            return state.has_enterprise
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
        },
        SET_ENTERPRISE_NAME: (state, enterprise_name) => {
            state.enterprise_name = enterprise_name;
        },
        SET_ENTERPRISE_TYPE: (state, enterprise_type) => {
            state.enterprise_type = enterprise_type;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_ENTERPRISE_CREATER_NAME: (state, enterprise_creater_name) => {
            state.enterprise_creater_name = enterprise_creater_name;
        },
        SET_ENTERPRI_ID: (state, enterpri_id) => {
            state.enterpri_id = enterpri_id;
        },
        SET_HAS_ENTERPRISE: (state, has_enterprise) => {
            state.has_enterprise = has_enterprise;
        },
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
        },
        // 获取当前登录用户信息
        store_get_baseinfo({commit}){
            return new Promise((resolve, reject) => {
                ajax_get_baseinfo().then(response => {
                    if (response.status == 'success') {
                        const data = response.data;

                        commit('SET_ENTERPRISE_NAME', data.enterpriseName);
                        set_enterprise_name(data.enterpriseName);

                        commit('SET_ENTERPRISE_TYPE', data.enterpriseType);
                        set_enterprise_type(data.enterpriseType);

                        commit('SET_USER', data.user);
                        set_user_info(data.user);

                        commit('SET_ENTERPRISE_CREATER_NAME', data.enterpriseCreaterName);
                        set_enterprise_creater_name(data.enterpriseCreaterName);
                        
                        commit('SET_ENTERPRI_ID', data.enterpriId);
                        set_enterpri_id(data.enterpriId);

                        commit('SET_HAS_ENTERPRISE', data.hasEnterprise);
                        set_has_enterprise(data.hasEnterprise);

                        resolve(data);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
});

export default store