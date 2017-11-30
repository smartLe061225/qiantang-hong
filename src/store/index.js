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
    get_has_enterprise,
    remove_has_enterprise,
    remove_all_cookie,
    get_enterprise_logo,
    set_enterprise_logo,
    remove_enterprise_logo,
    get_user_img,
    set_user_img,
    remove_user_img,
    get_enterprise_creater_img,
    set_enterprise_creater_img,
    remove_enterprise_creater_img,
    get_has_uploaded,
    set_has_uploaded,
    remove_has_uploaded
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
        has_enterprise: get_has_enterprise(),
        enterprise_logo: get_enterprise_logo(),
        user_img: get_user_img(),
        enterprise_creater_img: get_enterprise_creater_img(),
        check_upload_file: get_has_uploaded()
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
        },
        enterprise_logo: state => {
            return state.enterprise_logo
        },
        user_img: state => {
            return state.user_img
        },
        enterprise_creater_img: state => {
            return state.enterprise_creater_img
        },
        check_upload_file: state => {
            return state.check_upload_file
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
        SET_ENTERPRISE_LOGO: (state, enterprise_logo) => {
            state.enterprise_logo = enterprise_logo;
        },
        SET_USER_IMG: (state, user_img) => {
            state.user_img = user_img;
        },
        SET_ENTERPRISE_CREATER_IMG: (state, enterprise_creater_img) => {
            state.enterprise_creater_img = enterprise_creater_img;
        },
        SET_CHECK_UPLOAD_FILE: (state, check_upload_file) => {
            state.check_upload_file = check_upload_file;
        },
    },
    actions: {
        // 登录
        store_login({
            commit
          }, userInfo) {
            commit('SET_TOKEN', '');
            remove_token();
            remove_all_cookie();
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
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '');
                commit('SET_COMPANY_LIST_DATA', '');
                commit('SET_ENTERPRISE_NAME', '');
                commit('SET_ENTERPRISE_TYPE', '');
                commit('SET_USER', '');
                commit('SET_ENTERPRISE_CREATER_NAME', '');
                commit('SET_ENTERPRI_ID', '');
                commit('SET_HAS_ENTERPRISE', '');
                commit('SET_ENTERPRISE_LOGO', '');
                commit('SET_USER_IMG', '');
                commit('SET_ENTERPRISE_CREATER_IMG', '');
                commit('SET_CHECK_UPLOAD_FILE', false);
                remove_token();
                remove_all_cookie();
                resolve();
            });
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
        // 设置token
        store_set_token({ commit }, token) {
            set_token(token);
            commit('SET_TOKEN', token);
        },
        // 获取当前登录用户信息
        store_get_baseinfo({ commit }) {
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

                        commit('SET_ENTERPRISE_LOGO', data.enterpriseLogo);
                        set_enterprise_logo(data.enterpriseLogo);

                        commit('SET_USER_IMG', data.userImg);
                        set_user_img(data.userImg);

                        commit('SET_ENTERPRISE_CREATER_IMG', data.enterpriseCreaterImg);
                        set_enterprise_creater_img(data.enterpriseCreaterImg);

                        commit('SET_CHECK_UPLOAD_FILE', data.checkUploadFile);
                        set_has_uploaded(data.checkUploadFile);

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