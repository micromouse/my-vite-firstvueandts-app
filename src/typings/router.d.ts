import { RouteRecordRaw } from 'vue-router'

/**
 * 路由项信息接口
 */
export interface IRouteItemInfo {
  hidden?: boolean
  alwaysShow?: boolean
  code?: number
  name?: string
  fullPath?: string
  path?: string
  query?: LocationQueryRaw
  firstMenu?: boolean
  meta?: {
    title: string
    affix?: boolean
    activeMenu?: string
    breadcrumb?: boolean
    permission?: string
    elIconName?: string
    svgIconName?: string
    code?: number
    cachePage?: boolean
    leaveRmCachePage?: boolean
    closeTabRmCache?: boolean
  }
  children?: Array<RouteRecordRawExtend>
  redirect?: string
}

/**
 * RouteRecordRaw扩展(&:交叉类型,将多个类型合并为一个类型)
 */
export type RouteRecordRawExtend = RouteRecordRaw & IRouteItemInfo

/**
 * RouteRecordRawExtend集合
 */
export type RouteRecordRawExtendCollection = Array<RouteRecordRawExtend>
