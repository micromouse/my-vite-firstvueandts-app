import { App } from 'vue'

//element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//SvgIcon
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/icons/SvgIcon.vue'

//global dialog
import GDialog from '@/components/dialog/index'

//global axios
import axios from '@/infrustructures/utils/AxiosInstance'

import createMqttClient from '@/typings/MqttClient'

//全局组件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function install(app: App<any>) {
  app.component('svg-icon', SvgIcon)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  //GDialog
  GDialog._context = app._context
  app.use(GDialog)

  //axios
  app.config.globalProperties.$axios = axios

  //mqtt客户端
  app.config.globalProperties.$mqttClient = createMqttClient(window.appConfig.mqtt.url, window.appConfig.mqtt.options)
}
