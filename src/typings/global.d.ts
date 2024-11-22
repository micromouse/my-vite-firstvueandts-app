declare global {
  /**
   * String类型扩展方法
   */
  interface String {
    /**
     * 转换Unicode编码文本到中文
     */
    toChineseFromUnicode(): string

    /**
     * 转换字符串为json对象，若转换失败返回字符串本身
     */
    toTryJSON(): any
  }
}

export {}
