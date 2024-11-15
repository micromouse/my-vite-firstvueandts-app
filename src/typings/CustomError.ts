/**
 * 自定义错误
 * ---------------------
 * .ts 文件是 TypeScript 的 源代码文件，其中可以包含逻辑代码和类型定义。
 * 这些文件会被编译成 JavaScript 文件，最终在浏览器或 Node.js 环境中执行。
 */
export default class CustomError extends Error {
  readonly innerError: Error | undefined | unknown
  readonly data: unknown

  /**
   * 初始化自定义错误
   * @param message - 消息
   * @param innerError - 内部错误
   * @param data - 数据
   */
  constructor({ message = '', innerError = <Error | undefined | unknown>(<unknown>null), data = <unknown>null } = {}) {
    super(message)
    this.innerError = innerError
    this.data = data
  }
}
