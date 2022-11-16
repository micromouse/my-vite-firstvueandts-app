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
    meta: { title: 'About Group', elIconName: 'Fold' },
    children: [
      {
        name: 'about',
        path: 'index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
        meta: { title: 'About' },
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
    meta: { title: 'Writing Demo', svgIconName: 'eye-open' },
    children: [
      {
        name: 'Hook',
        path: 'hook',
        component: () => import('@/views/example/hook/HookView.vue'),
        meta: { title: 'Hook-Demo' }
      },
      {
        name: 'SvgIcon',
        path: 'svg-icon',
        component: () => import('@/views/example/svg-icon/SvgIconView.vue'),
        meta: { title: 'SvgIcon-Demo' }
      },
      {
        name: 'Parent-Children',
        path: 'parent-children',
        component: () => import('@/views/example/parent-children/ParentView.vue'),
        meta: { title: 'Parent-Children' }
      },
      {
        name: 'ShowDialog',
        path: 'show-dialog',
        component: () => import('@/views/example/dialog/ShowdialogView.vue'),
        meta: { title: 'Show-Dialog' }
      },
      {
        name: 'Mock',
        path: 'mocks',
        component: () => import('@/views/example/mock/MockView.vue'),
        meta: { title: 'Mock-Test' }
      },
      {
        name: 'LoginedUser',
        path: 'logined-user',
        component: () => import('@/views/example/logineduser/LoginedUserView.vue'),
        meta: { title: 'Logined-User' }
      },
      {
        name: 'Table',
        path: 'table',
        component: () => import('@/views/example/table/TableView.vue'),
        meta: { title: 'Table-Demo' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    firstMenu: true,
    meta: { title: '嵌套菜单', svgIconName: 'nested' },
    children: [
      {
        name: 'menu1',
        path: 'menu1',
        component: () => import('@/views/nested/menu1/Menu1View.vue'),
        meta: { title: 'menu1' },
        children: [
          {
            name: 'menu1-1',
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/Menu1-1View.vue'),
            meta: { title: 'menu1-1' }
          },
          {
            name: 'menu1-2',
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/Menu1-2View.vue'),
            meta: { title: 'menu1-2' },
            children: [
              {
                name: 'menu1-2-1',
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/Menu1-2-1View.vue'),
                meta: { title: 'menu1-2-1', affix: true }
              },
              {
                name: 'menu1-2-2',
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/Menu1-2-2View.vue'),
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            name: 'menu1-3',
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/Menu1-3View.vue'),
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        name: 'menu2',
        path: 'menu2',
        component: () => import('@/views/nested/menu2/Menu2View.vue'),
        meta: { title: 'menu2' }
      }
    ]
  }
]

//建立路由器
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
