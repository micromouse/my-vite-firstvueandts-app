/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from 'vue'

/**
 * 注册v-permission指令
 * @param app - app
 */
export default function install(app: App<any>) {
  app.directive('permission', {
    mounted(el: any, binding: any) {
      /*
      //获取当前的this实例,路由信息
      const vm: any = binding.instance
      const route = vm.$route
      */
      const code = binding.value || ''
      if (code != '') {
        const userpermissions = localStorage.getItem('userpermissions')?.split(',') ?? []
        if (userpermissions.indexOf(code) === -1) {
          el['hidden'] = true
          el.style.display = 'none'
        }
      }
    }
  })
}
