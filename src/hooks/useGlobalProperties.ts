import useCurrentInstance from './useCurrentInstance'

/**
 * 使用全局属性
 * @returns - 解析指定key属性值函数
 */
export default function useGlobalProperties() {
  /**
   * 首先是到底什么时候才能访问通过 getCurrentInstance()  当前实例：
   *
   * 只要在 setup() 内部调用的任何方法，都能获取到当前实例，无论函数调用栈有多深
   * 但只能在同步代码中才能访问，其它的诸如 setTimeout、 DOM 事件 、 Promise 这类异步代码均无法访问
   *
   * 无法访问的原因是：
   * Composition API 会在调用组件的 setup() 前，先拿一个变量存放当前实例，以供调用 getCurrentInstance() 时返回，源码：mixin.ts#L95 和 instance.ts#L116
   * 执行完 setup() 以后，会把用于存放当前实例的变量值恢复到以前的模样（也就是 null ），源码：instance.ts#L126
   * 所以，当 Composition API 内部执行到我们组件的 setup() 时，所有的同步代码都能访问到当前实例，但那些异步代码再去访问时，它已经恢复成 null  了。
   */
  const properties = useCurrentInstance().appContext.config.globalProperties

  /**
   * 从全局属性中解析出指定key的属性值
   */
  const resolve = <T>(key: string) => <T>properties[key]

  //数据
  return {
    resolve
  }
}
