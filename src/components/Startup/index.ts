import { App } from 'vue'

//router
import router from '@/router/index'
import '@/router/permissions'

//global css,element-plus css,
import '@/styles/index.scss'
import '@/theme/index.scss'

//global dialog
import GDialog from '@/components/dialog/index'

//pinia
import { createPinia } from 'pinia'

//global axios
import axios from '@/infrustructures/utils/AxiosInstance'

//global error
import globalError from './useGlobalError'

//global components
import globalComponent from './useGlobalComponent'

import vpermissionRegister from './useVPermissionRegister'

//安装所有插件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function install(app: App<any>) {
  app.config.globalProperties.$axios = axios

  //全局插件
  GDialog._context = app._context
  app.use(globalError).use(router).use(createPinia()).use(GDialog).use(globalComponent).use(vpermissionRegister)

  return app
}
