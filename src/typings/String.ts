/**
 * 转换Unicode编码文本到中文
 */
String.prototype.toChineseFromUnicode = function (): string {
  return this.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace('\\u', ''), 16))
  })
}
