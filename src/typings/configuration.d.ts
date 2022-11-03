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
  useStore: boolean
  authority: string
  client_id: string
  client_secret: string
  redirect_uri: string
  popup_redirect_uri: string
  response_type: string
  automaticSilentRenew: boolean
  silent_redirect_uri: string
  scope: string
  post_logout_redirect_uri: string
  loadUserInfo: boolean
}
