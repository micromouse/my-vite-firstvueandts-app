//router
import router from '@/router/index'
import '@/router/permissions'

//global css,element-plus css,
import '@/styles/index.scss'
import '@/theme/index.scss'

//element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//SvgIcon
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/icons/SvgIcon.vue'

//global dialog
import GDialog from '@/components/dialog/index'

//pinia
import { createPinia } from 'pinia'

//global axios
import axios from '@/infrustructures/utils/AxiosInstance'

//global error
import globalError from './useGlobalError'

//安装所有插件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function install(app: any) {
  app.config.globalProperties.$axios = axios

  //全局组件
  app.component('svg-icon', SvgIcon)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  //全局插件
  GDialog._context = app._context
  app.use(globalError).use(router).use(createPinia()).use(GDialog)

  return app
}
