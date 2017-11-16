import Vue from 'vue'
import Router from 'vue-router'
import { get_token } from '../util/auth'

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

const company = r => require.ensure([], () => r(require('../views/analysis/')), 'company')
const information = r => require.ensure([], () => r(require('../views/company/information')), 'information')
const manager = r => require.ensure([], () => r(require('../views/company/manager')), 'manager')
const department = r => require.ensure([], () => r(require('../views/company/department')), 'department')
const group = r => require.ensure([], () => r(require('../views/company/group')), 'group')
const role = r => require.ensure([], () => r(require('../views/company/role')), 'role')

const notFound = r => require.ensure([], () => r(require('components/error/404')), 'notFound')


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'admin',
    component: admin,
    redirect: '/dashboard',
    meta: {
      title: '管理中心',
      show_in_bread_curmb_bar: false,
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard,
        meta: {
          title: '控制台'
        }
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: analysis,
        meta: {
          title: '分析',
          show_in_bread_curmb_bar: false,
        },
        children: [{
          path: 'assets',
          name: 'assets',
          component: assets,
          meta: {
            title: '资产分析',
            show_in_bread_curmb_bar: true,
          }
        }, {
          path: 'cash',
          name: 'cash',
          component: cash,
          meta: {
            title: '现金分析',
            show_in_bread_curmb_bar: true,
          }
        }, {
          path: 'profits',
          name: 'profits',
          component: profits,
          meta: {
            title: '利润分析',
            show_in_bread_curmb_bar: true,
          }
        }, {
          path: 'warning',
          name: 'warning',
          component: warning,
          meta: {
            title: '预警分析',
            show_in_bread_curmb_bar: true,
          }
        }]
      },{
        path: 'company',
        name: 'company',
        component: company,
        meta: {
          title: '企业管理',
          show_in_bread_curmb_bar: false,
        },
        children: [{
          path: 'information',
          name: 'information',
          component: information,
          meta: {
            title: '公司资料',
            show_in_bread_curmb_bar: true,
          }
        }, {
            path: 'manager',
            name: 'manager',
            component: manager,
            meta: {
              title: '公司管理',
              show_in_bread_curmb_bar: true,
            }
          }, {
            path: 'department',
            name: 'department',
            component: department,
            meta: {
              title: '部门管理',
              show_in_bread_curmb_bar: true,
            }
          }, {
            path: 'group',
            name: 'group',
            component: group,
            meta: {
              title: '成员管理',
              show_in_bread_curmb_bar: true,
            }
          }, {
            path: 'role',
            name: 'role',
            component: role,
            meta: {
              title: '角色管理',
              show_in_bread_curmb_bar: true,
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

const white_list = ['/login', '/join', '/forget']

router.beforeEach((to, from, next) => {

  document.title = to.meta.title ? to.meta.title : '宏管理'

  if (get_token()) {
    if (to.path === '/login') {
      next({ path: '/dashboard' });
    } else {
      next();
    }
  } else {
    if (white_list.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }

  // next()

})

export default router;
