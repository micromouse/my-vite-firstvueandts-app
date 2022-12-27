import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue'
import { RouteRecordRawExtendCollection } from '@/typings/router'

//路由集合
export const routes: RouteRecordRawExtendCollection = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    firstMenu: true,
    meta: { title: 'Home', activeMenu: '/', svgIconName: 'table' },
    children: [
      {
        name: 'home',
        path: 'index',
        component: () => import('@/views/HelloWorldView.vue'),
        props(_route) {
          return {
            //Discarded invalid param(s) "paramsContent" when navigating.
            //https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
            paramsContent: _route.params.content,
            id: _route.query.id
          }
        }
      }
    ]
  },
  {
    path: '/signin-oidc',
    hidden: true,
    component: () => import('@/views/signin-oidc/SigninOidcView.vue')
  },
  {
    path: '/about',
    component: Layout,
    alwaysShow: true,
    firstMenu: true,
    meta: { title: 'About Group', elIconName: 'Fold', permission: 'about' },
    children: [
      {
        name: 'about',
        path: 'index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
        meta: { title: 'About', permission: 'about.index' },
        props(_route) {
          return {
            id: _route.query.id
          }
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/write-demo',
    component: Layout,
    redirect: '/write-demo/hook',
    firstMenu: true,
    meta: { title: 'Writing Demo', svgIconName: 'eye-open', permission: 'demo' },
    children: [
      {
        name: 'Hook',
        path: 'hook',
        component: () => import('@/views/example/hook/HookView.vue'),
        meta: { title: 'Hook-Demo', permission: 'demo.hook' }
      },
      {
        name: 'SvgIcon',
        path: 'svg-icon',
        component: () => import('@/views/example/svg-icon/SvgIconView.vue'),
        meta: { title: 'SvgIcon-Demo', permission: 'demo.svgicon' }
      },
      {
        name: 'Parent-Children',
        path: 'parent-children',
        component: () => import('@/views/example/parent-children/ParentView.vue'),
        meta: { title: 'Parent-Children', permission: 'demo.parentchildren' }
      },
      {
        name: 'ShowDialog',
        path: 'show-dialog',
        component: () => import('@/views/example/dialog/ShowdialogView.vue'),
        meta: { title: 'Show-Dialog', permission: 'demo.showdialog' }
      },
      {
        name: 'Mock',
        path: 'mocks',
        component: () => import('@/views/example/mock/MockView.vue'),
        meta: { title: 'Mock-Test', permission: 'demo.mock' }
      },
      {
        name: 'LoginedUser',
        path: 'logined-user',
        component: () => import('@/views/example/logineduser/LoginedUserView.vue'),
        meta: { title: 'Logined-User', permission: 'demo.logineduser' }
      },
      {
        name: 'Table',
        path: 'table',
        component: () => import('@/views/example/table/TableView.vue'),
        meta: { title: 'Table-Demo', permission: 'demo.table' },
        children: [
          {
            path: 'add',
            component: () => null,
            meta: { title: 'table-add', permission: 'table-add', hidden: true }
          },
          {
            path: 'edit',
            component: () => null,
            meta: { title: 'table-edit', permission: 'table-edit', hidden: true }
          }
        ]
      },
      {
        name: 'Editor',
        path: 'editor',
        component: () => import('@/views/example/EditorView.vue'),
        meta: { title: 'Editor-Demo', permission: 'demo.editor' }
      },
      {
        name: 'EditorV3',
        path: 'editorV3',
        component: () => import('@/views/example/Editorv3View.vue'),
        meta: { title: 'Editor-V3-Demo', permission: 'demo.editorv3' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    firstMenu: true,
    meta: { title: '嵌套菜单', svgIconName: 'nested', permission: 'nested' },
    children: [
      {
        name: 'menu1',
        path: 'menu1',
        component: () => import('@/views/nested/menu1/Menu1View.vue'),
        meta: { title: 'menu1', permission: 'nested.menu1' },
        children: [
          {
            name: 'menu1-1',
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/Menu1-1View.vue'),
            meta: { title: 'menu1-1', permission: 'nested.menu1.menu1-1' }
          },
          {
            name: 'menu1-2',
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/Menu1-2View.vue'),
            meta: { title: 'menu1-2', permission: 'nested.menu1.menu1-2' },
            children: [
              {
                name: 'menu1-2-1',
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/Menu1-2-1View.vue'),
                meta: { title: 'menu1-2-1', affix: true, permission: 'nested.menu1.menu1-2.menu1-2-1' }
              },
              {
                name: 'menu1-2-2',
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/Menu1-2-2View.vue'),
                meta: { title: 'menu1-2-2', permission: 'nested.menu1.menu1-2.menu1-2-2' }
              }
            ]
          },
          {
            name: 'menu1-3',
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/Menu1-3View.vue'),
            meta: { title: 'menu1-3', permission: 'nested.menu1.menu1-3' }
          }
        ]
      },
      {
        name: 'menu2',
        path: 'menu2',
        component: () => import('@/views/nested/menu2/Menu2View.vue'),
        meta: { title: 'menu2', permission: 'nested.menu2' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    firstMenu: true,
    alwaysShow: true,
    meta: { title: '权限管理', elIconName: 'Key' },
    children: [
      {
        name: 'permission',
        path: 'index',
        component: () => import('@/views/permission/SetUserPrimissionView.vue'),
        meta: { title: '设置用户权限' }
      }
    ]
  },
  {
    name: '404',
    path: '/:catchAll(.*)',
    component: () => import('@/views/404View.vue'),
    hidden: true
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/403View.vue'),
    hidden: true
  }
]

//建立路由器
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
