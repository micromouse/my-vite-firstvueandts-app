/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'vue'
import { IGDialogCreateOptions } from '@/typings/GDialog'
import useCurrentInstance from './useCurrentInstance'

/**
 * 使用全局对话框
 * @returns - 全局对话框show函数
 * @deprecated - 此函数已被弃用
 *
 * 此函数已弃用，使用下面方法 ：
 * ------------------------
 * import useGlobalProperties from '@/hooks/useGlobalProperties'
 * const globalProperties = useGlobalProperties
 * const $gdialog = globalProperties.resolve<IGDialogShow>('$gdialog')
 */
export default function useGDialog() {
  const { $gdialog } = useCurrentInstance().appContext.config.globalProperties

  //显示全局对话框
  const show = (component: Component, options: IGDialogCreateOptions) => {
    $gdialog.show(component, options)
  }

  //数据
  return {
    show
  }
}
