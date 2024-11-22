/**
 * 转换Unicode编码文本到中文
 */
String.prototype.toChineseFromUnicode = function (): string {
  return this.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace('\\u', ''), 16))
  })
}

/**
 * 转换字符串为json对象，若转换失败返回字符串本身
 */
String.prototype.toTryJSON = function (): any {
  try {
    const parsed = JSON.parse(this.toString())
    // 返回解析后的对象
    return parsed && typeof parsed === 'object' ? parsed : this
  } catch {
    return this
  }
}
