// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie';
import Vuex from 'vuex'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import 'src/util/validate.js';

import store from './store';

Vue.config.productionTip = false



Vue.use(iView);
Vue.use(VueCookie);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
