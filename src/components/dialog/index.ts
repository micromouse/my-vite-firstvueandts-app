/* eslint-disable @typescript-eslint/no-explicit-any */
import GDialog from './GDialog.vue'
import { Component, h, render } from 'vue'
import { IGDialogCreateOptions } from '@/typings/GDialog'

//建立组件挂载
const createMount = (component: Component, options: IGDialogCreateOptions) => {
  const mountNode = document.createElement('div')

  document.body.appendChild(mountNode)
  const vnode = h(GDialog, {
    component,
    options,
    remove: () => {
      document.body.removeChild(mountNode)
    }
  })

  vnode.appContext = Modal._context
  render(vnode, mountNode)
}

const Modal = {
  install(app: any) {
    //全局对话框属性
    app.config.globalProperties.$gdialog = {
      /**
       * 动态加载对话框
       * @param component - 组件
       * @param options - 选项
       */
      show: (component: Component, options: IGDialogCreateOptions) => {
        //初始化唯一id[删除组件时用于定位],宽度,footer信息
        options.id ??= `v3popup_${new Date().getTime()}`
        options.width ??= 600
        options.footer ??= {}
        options.footer.showFooter ??= true
        options.footer.showCancel ??= true

        //建立对话框挂载
        createMount(component, options)
      }
    }
  },
  _context: null
}
export default Modal
