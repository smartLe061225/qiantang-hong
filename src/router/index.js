import Vue from 'vue'
import Router from 'vue-router'

const admin = r => require.ensure([], () => r(require('../views/admin/admin')), 'admin')
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const join = r => require.ensure([], () => r(require('../views/join/join')), 'join')
const notFound = r => require.ensure([], () => r(require('components/error/404')), 'notFound')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'admin',
    component: admin,
    meta: {
      title: '管理中心'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  //注册页
  {
    path: '/join',
    name: 'join',
    component: join,
    meta: {
      title: '注册'
    }
  },
  {
    path: "/*",
    name: "error",
    component: notFound,
    meta: {
      title: '404'
    }
  }
]



const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {

  document.title = to.meta.title ? to.meta.title : '宏管理'
  next()

})

export default router;
