import { ISystemSetting } from './common'

/**
 * 应用程序配置信息接口
 */
declare interface IAppConfiguration {
  oidc: IOidc | null
  settings: ISystemSetting | null
}

/**
 * oidc设置
 */
declare interface IOidc {
  /**
   * 是否使用存储
   */
  useStore: boolean
  /**
   * sso url
   */
  authority: string
  /**
   * client id
   */
  client_id: string
  /**
   * client secret
   */
  client_secret: string
  /**
   * 认证成功重定向Url
   */
  redirect_uri: string
  /**
   * 弹出窗口认证成功重定向Url
   */
  popup_redirect_uri: string
  /**
   * 响应类型
   */
  response_type: string
  /**
   * 是否自动静默认证
   */
  automaticSilentRenew: boolean
  /**
   * 静默认证重定向Url
   */
  silent_redirect_uri: string
  /**
   * 范围
   */
  scope: string
  /**
   * 登出重定向Url
   */
  post_logout_redirect_uri: string
  /**
   * 是否加载用户信息
   */
  loadUserInfo: boolean
}
