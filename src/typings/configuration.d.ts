/**
 * 应用程序配置信息接口
 */
declare interface IAppConfiguration {
  oidc: IOidc | null
  settings: ISystemSetting
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
  popup_redirect_uri: string
  response_type: string
  automaticSilentRenew: boolean
  silent_redirect_uri: string
  scope: string
  post_logout_redirect_uri: string
  loadUserInfo: boolean
}
