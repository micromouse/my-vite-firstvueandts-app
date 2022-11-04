import { User, UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts'

/**
 * 认证服务
 */
export default class AuthenticationService {
  private readonly _userManager?: UserManager

  //#region 初始化认证服务
  /**
   * 初始化认证服务
   * @param configuration - 认证配置
   */
  constructor(configuration: IOidc | null) {
    //初始化oidc
    if (window.appConfig.settings.isNeedLogin) {
      //Oidc配置不能为空
      if (configuration == null) {
        throw 'Oidc配置不能为空'
      }

      this._userManager = new UserManager({
        userStore: configuration.useStore ? new WebStorageStateStore({ store: window.localStorage }) : null,
        authority: configuration.authority,
        client_id: configuration.client_id,
        client_secret: configuration.client_secret,
        redirect_uri: configuration.redirect_uri,
        popup_redirect_uri: configuration.popup_redirect_uri,
        response_type: configuration.response_type,
        automaticSilentRenew: configuration.automaticSilentRenew,
        silent_redirect_uri: configuration.silent_redirect_uri,
        scope: configuration.scope,
        post_logout_redirect_uri: configuration.post_logout_redirect_uri,
        loadUserInfo: configuration.loadUserInfo
      } as UserManagerSettings)
    }
  }
  //#endregion

  /**
   * Returns promise to notify the parent window of response from the authorization endpoint
   */
  public signinRedirectCallback(): Promise<User | void> {
    if (!this._userManager) {
      return new Promise((resolve) => resolve(undefined))
    }

    return this._userManager.signinCallback()
  }

  /**
   * 获得用户
   * @returns - Promise<User>
   */
  public getUser(): Promise<User | null> {
    //无须登陆
    if (!window.appConfig.settings.isNeedLogin || !this._userManager) {
      return new Promise((resolve) => resolve(null))
    }

    return this._userManager.getUser()
  }

  /**
   * 登录系统
   */
  public login(): Promise<void> {
    if (!this._userManager) {
      return new Promise((resolve) => resolve(undefined))
    }
    return this._userManager.signinRedirect()
  }

  /**
   * 注销登录
   */
  public logout(): Promise<void> {
    if (!this._userManager) {
      return new Promise((resolve) => resolve(undefined))
    }
    return this._userManager.signoutRedirect()
  }
}
