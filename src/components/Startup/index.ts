import { App } from 'vue'

//router
import router from '@/router/index'
import '@/router/permissions'

//global css,element-plus css,
import '@/styles/index.scss'
import '@/theme/index.scss'

//pinia
import { createPinia } from 'pinia'

//global error
import globalError from './useGlobalError'

//global components
import globalComponent from './useGlobalComponent'

//自定义指令v-permission
import vpermissionRegister from './useVPermissionRegister'

//安装所有插件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function install(app: App<any>) {
  //全局插件
  app.use(globalError).use(router).use(createPinia()).use(globalComponent).use(vpermissionRegister)

  return app
}
