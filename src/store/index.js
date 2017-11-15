import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        current_path: [{
            path: '/dashboard',
            name: 'dashboard',
            meta: {
                title: '管理首页'
            }
        }]
    },
    mutations: {
        set_current_path(state, current_path) {
            state.current_path = current_path;
        }
    },
    
});

export default store