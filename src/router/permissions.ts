import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { User } from 'oidc-client-ts'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useRouterStore } from '@/infrustructures/store/router'
import router, { routes } from './index'
import AuthenticationService from '@/infrustructures/utils/AuthenticationService'

// NProgress Configuration
NProgress.configure({ showSpinner: false })

//白名单地址，无须认证就可访问
const whites: Array<string> = ['/signin-oidc', '/403']
let authenticationService: AuthenticationService

//路由拦截开始
router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  //系统不需要登录,跳过认证
  if (!window.appConfig.settings.isNeedLogin) {
    logined(null, to, next)
    return
  }

  authenticationService = new AuthenticationService(window.appConfig.oidc)
  const user = await authenticationService.getUser()
  if (whites.indexOf(to.path) != -1) {
    next()
  } else if (user && !user.expired) {
    logined(user, to, next)
  } else {
    await login(to, next)
  }
})

//路由拦截结束
router.afterEach(() => NProgress.done())

/**
 * 用户未登录,执行登录操作
 */
const login = async (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    if (!sessionStorage.getItem('redirectedUri')) {
      sessionStorage.setItem('redirectedUri', to.path)
    }
    await authenticationService.login()
  } catch (e) {
    console.log('authentication failure:', e)
    next('/403')
  }
}

/**
 * 用户已登录
 * @param _user - 已认证用户
 * @param to - 下一页
 * @param next - NavigationGuardNext
 */
const logined = (_user: User | null, to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const routerStore = useRouterStore()
  if (routerStore.routes.length == 0) {
    routerStore.M_SetRoutes(routes.filter((r) => !r.hidden && !r.meta?.hidden))
  }

  //登录用户不为null，验证页面权限
  if (_user !== null) {
    const userpermissions = localStorage.getItem('userpermissions')?.split(',') ?? []
    if (to.meta && to.meta.permission && userpermissions.indexOf(<string>to.meta.permission) === -1) {
      next('/403')
    }
  }

  next()
}
