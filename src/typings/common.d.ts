//Object类型
export interface IObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

//默认设置类型
export interface ISystemSetting {
  /**
   * 系统标题
   */
  title: string
  /*
   * @description Whether show shidebar logo
   * /
  sidebarLogo: boolean
  /**
   * @description Whether show the settings right-panel
   */
  showLeftMenu: boolean
  /**
   * @description Whether show the drop-down
   */
  ShowDropDown: boolean
  /**
   * @description Whether show Hamburger
   */
  showHamburger: boolean
  /**
   * @description Whether need login
   */
  isNeedLogin: boolean
  /**
   * @description Whether need nprogress
   */
  isNeedNprogress: boolean
  /**
   * @description Whether show TagsView
   */
  showTagsView: boolean
  /**
   * @description TagsView show number
   */
  tagsViewNum: number
  /**
   * @description Whether  open prod mock
   */
  openProdMock: boolean
  /**
   * @type {string | array} 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['dev', 'test']
   */
  errorLog: string | Array<string>
  /**
   * @description permission mode
   */
  permissionMode: string
  /*
   * @description table height(100vh-delWindowHeight)
   * */
  delWindowHeight: string
  /*
   * @description setting dev token when  isNeedLogin is setting false
   * */
  tmpToken: string
  /**
   * @description Whether show the title in Navbar
   */
  showNavbarTitle: boolean
  /**
   * @description Whether show the top Navbar
   */
  showTopNavbar: boolean
  /**
   * @description Whether need animation of main area
   */
  mainNeedAnimation: boolean
  /*
   * @description vite.config.js base config
   */
  viteBasePath: string
}
