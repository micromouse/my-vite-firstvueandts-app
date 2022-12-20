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
      const route = vm.$route

      //根据路由信息获取菜单权限信息,可获取到当前菜单的所有信息
      if (code == 'table-add') {
        console.log('about route', route)
        el['hidden'] = true
        el.style.display = 'none'
      }
    }
  })
}
