import { IObject } from '@/typings/common'
import CustomError from '@/typings/CustomError'

/**
 * 使用错误处理器
 */
export default function useErrorHandler() {
  /**
   * 显示错误
   * @param message - 错误消息
   * @param data - 错误数据
   */
  const show = (message: string, data: IObject) => {
    console.group(message)

    Object.entries(data).forEach(([key, value]) => {
      console.log(key, value)

      /**
       * instanceof - 实例类型,详见/Readme/jstypecheck.md
       */
      if (value instanceof CustomError) {
        console.log('err.innerError', value.innerError)
        console.log('err.data', value.data)
      }
    })

    console.groupEnd()
  }

  return {
    show
  }
}
