import Vue from 'vue'
import Router from 'vue-router'
import { get_token } from '../util/auth'
import {
  get_has_enterprise,
  get_has_uploaded
} from '../util/user'

const admin = r => require.ensure([], () => r(require('../views/admin/admin')), 'admin')
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const join = r => require.ensure([], () => r(require('../views/join/join')), 'join')
const forget = r => require.ensure([], () => r(require('../views/forget/forget')), 'forget')

const certification = r => require.ensure([], () => r(require('../views/certification')), 'certification')

const init = r => require.ensure([], () => r(require('../views/init')), 'init')

const dashboard = r => require.ensure([], () => r(require('../views/dashboard/')), 'dashboard')

const setting_index = r => require.ensure([], () => r(require('../views/setting/')), 'setting_index')
const setting = r => require.ensure([], () => r(require('../views/setting/setting')), 'setting')

const analysis = r => require.ensure([], () => r(require('../views/analysis/')), 'analysis')
const assets = r => require.ensure([], () => r(require('../views/analysis/assets')), 'assets')
const cash = r => require.ensure([], () => r(require('../views/analysis/cash')), 'cash')
const profits = r => require.ensure([], () => r(require('../views/analysis/profits')), 'profits')
const warning = r => require.ensure([], () => r(require('../views/analysis/warning')), 'warning')
const importlist = r => require.ensure([], () => r(require('../views/analysis/importlist')), 'importlist')

const company = r => require.ensure([], () => r(require('../views/company/')), 'company')
const information = r => require.ensure([], () => r(require('../views/company/information')), 'information')
const manager = r => require.ensure([], () => r(require('../views/company/manager')), 'manager')
const department = r => require.ensure([], () => r(require('../views/company/department')), 'department')
const member = r => require.ensure([], () => r(require('../views/company/member')), 'member')
const role = r => require.ensure([], () => r(require('../views/company/role')), 'role')
const organization = r => require.ensure([], () => r(require('../views/company/organization')), 'organization')
const certification_change = r => require.ensure([], () => r(require('../views/company/certification')), 'certification_change')

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
        },
      },
      {
        path: 'init',
        name: 'init',
        component: init,
        meta: {
          title: '上传初始数据'
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: setting_index,
        meta: {
          title: '个人设置',
          how_in_bread_curmb_bar: false,
        },
        children: [{
          path: 'info',
          name: 'info',
          component: setting,
          meta: {
            title: '个人设置',
            how_in_bread_curmb_bar: true,
          }
        }]
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
          path: 'list/:id',
          name: 'list',
          component: importlist,
          meta: {
            title: '导入列表',
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
      }, {
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
          path: 'organization',
          name: 'organization',
          component: organization,
          meta: {
            title: '组织架构',
            show_in_bread_curmb_bar: true,
          }
        }, {
          path: 'change-certification',
          name: 'change_certification',
          component: certification_change,
          meta: {
            title: '修改认证信息',
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
          path: 'member',
          name: 'member',
          component: member,
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
    path: '/rz',
    name: 'certification',
    component: certification,
    meta: {
      title: '企业资料认证'
    }
  },
  // {
  //   path: '/init',
  //   name: 'init',
  //   component: init,
  //   meta: {
  //     title: '上传初始数据'
  //   }
  // },
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
  mode: 'hash',
  linkActiveClass: 'active',
  routes
})

const white_list = ['/login', '/join', '/forget']

router.beforeEach((to, from, next) => {
  if (get_token()) {
    if (to.path === '/login') {
      if (get_has_enterprise()) {
        if (get_has_uploaded()) {
          next({ path: '/dashboard' });
        } else {
          next({ path: '/init' });
        }
      } else {
        next({ path: '/rz' });
      }
    } else if (to.path === '/dashboard') {
      if (get_has_enterprise()) {
        if (get_has_uploaded()) {
          next();
        } else {
          next({ path: '/init' });
        }
      } else {
        next({ path: '/rz' });
      }
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

  document.title = to.meta.title ? to.meta.title : '企知'
  document.body.scrollTop = 0;

  // next()

})

export default router;
