/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from 'vue'

/**
 * 注册v-permission指令
 * @param app - app
 */
export default function install(app: App<any>) {
  app.directive('permission', {
    mounted(el: any, binding: any) {
      //获取当前的this实例,路由信息
      const code = binding.value || ''
      const vm: any = binding.instance
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const route = vm.$route

      //根据路由信息获取菜单权限信息,可获取到当前菜单的所有信息
      const userpermissions = localStorage.getItem('userpermissions')?.split(',')
      if (code && (!userpermissions || userpermissions.indexOf(code) === -1)) {
        el['hidden'] = true
        el.style.display = 'none'
      }
    }
  })
}
