/** 
 * .d.ts 文件是 TypeScript 的 声明文件，主要用于为 JavaScript 代码或库 提供类型定义。
 * 这些文件中的内容不会被编译成 JavaScript，它们只是告诉 TypeScript 编译器在类型检查时应该如何理解某些模块、变量、接口或类型。
*/
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
    hidden?: boolean
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
