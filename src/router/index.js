import Vue from 'vue'
import Router from 'vue-router'

const admin = r => require.ensure([], () => r(require('../views/admin/admin')), 'admin')
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const join = r => require.ensure([], () => r(require('../views/join/join')), 'join')
const forget = r => require.ensure([], () => r(require('../views/forget/forget')), 'forget')

const dashboard = r => require.ensure([], () => r(require('../views/dashboard/')), 'dashboard')

const analysis = r => require.ensure([], () => r(require('../views/analysis/')), 'analysis')
const assets = r => require.ensure([], () => r(require('../views/analysis/assets')), 'assets')
const cash = r => require.ensure([], () => r(require('../views/analysis/cash')), 'cash')
const profits = r => require.ensure([], () => r(require('../views/analysis/profits')), 'profits')
const warning = r => require.ensure([], () => r(require('../views/analysis/warning')), 'warning')

const notFound = r => require.ensure([], () => r(require('components/error/404')), 'notFound')


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'admin',
    component: admin,
    meta: {
      title: '管理中心'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard,
        meta: {
          title: '管理首页'
        }
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: analysis,
        meta: {
          title: '分析'
        },
        children: [{
          path: 'assets',
          name: 'assets',
          component: assets,
          meta: {
            title: '资产分析'
          }
        }, {
            path: 'cash',
            name: 'cash',
            component: cash,
            meta: {
              title: '现金分析'
            }
          }, {
            path: 'profits',
            name: 'profits',
            component: profits,
            meta: {
              title: '利润分析'
            }
          }, {
            path: 'warning',
            name: 'warning',
            component: warning,
            meta: {
              title: '预警分析'
            }
          }]
      }
    ]
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
    path: '/forget',
    name: 'forget',
    component: forget,
    meta: {
      title: '找回密码'
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
