/**
 * 自定义错误
 */
export default class CustomError extends Error {
  readonly innerError: Error | undefined
  readonly data: unknown

  /**
   * 初始化自定义错误
   * @param message - 消息
   * @param innerError - 内部错误
   * @param data - 数据
   */
  constructor({ message = '', innerError = <Error | undefined>(<unknown>null), data = <unknown>null } = {}) {
    super(message)
    this.innerError = innerError
    this.data = data
  }
}
