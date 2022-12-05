import { ComponentPublicInstance } from 'vue'
import useErrorHandler from '@/infrustructures/hooks/useErrorHandler'

const errorHandler = useErrorHandler()

/**
 * 使用全局异常处理
 * @param app - app
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function install(app: any) {
  /**
   * 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
   * 它可以从下面这些来源中捕获错误：
   * 组件渲染器
   * 事件处理器
   * 生命周期钩子
   * setup() 函数
   * 侦听器
   * 自定义指令钩子
   * 过渡 (Transition) 钩子
   * @param err - 错误对象
   * @param vm - 触发该错误的组件实例
   * @param info - 指出错误来源类型信息的字符串
   * @returns - void
   */
  app.config.errorHandler = (err: unknown, vm: ComponentPublicInstance | null, info: string) =>
    errorHandler.show('global errorHandler', { err, vm, info })

  /**
   * 用来抓取异常信息，只在生产环境有效，在开发环境无效
   * @param err - 错误对象
   * @param vm - 触发该错误的组件实例
   * @param info - 指出错误来源类型信息的字符串
   * @returns - void
   */
  app.config.warnHandler = (err: unknown, vm: ComponentPublicInstance | null, info: string) =>
    errorHandler.show('global warnHandler', { err, vm, info })

  /**
   * 当 JS 运行时发生错误（包括语法错误），触发 window.onerror()
   * @param message - 错误信息（字符串）。可用于HTML onerror=""处理程序中的 event
   * @param source - 发生错误的脚本URL（字符串）
   * @param lineno - 发生错误的行号（数字）
   * @param colno - 发生错误的列号（数字）
   * @param error - Error对象（对象）
   * @returns - 若该函数返回true，则阻止执行默认事件处理函数
   */
  window.onerror = (message, source, lineno, colno, error) => {
    console.log({ type: 'window.onerror', message, source, lineno, colno, error })
  }

  window.addEventListener('error', (e) => {
    console.log('window.addEventListener.error', e)
  })
}
