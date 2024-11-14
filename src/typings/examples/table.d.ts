//TableView视图用户信息
export interface ITableItemUserInfo {
  /**
   * id
   */
  id: number
  /**
   * 名称
   */
  name: string
  /**
   * 账户余额
   */
  money: string
  /**
   * 状态
   */
  state: string
  /**
   * 注册时间
   */
  date: string
  /**
   * 地址
   */
  address: string
  /**
   * 远程头像
   */
  thumb: string
  /**
   * 本地头像
   */
  localThumb: string
}

export interface ITableResponseData {
  list: ITableItemUserInfo[]
  pageTotal: number
}
