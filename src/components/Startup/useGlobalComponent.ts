import { App } from 'vue'

//element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//SvgIcon
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/icons/SvgIcon.vue'

//全局组件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function install(app: App<any>) {
  app.component('svg-icon', SvgIcon)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
