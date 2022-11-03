import { RouteRecordRawExtend } from './router'

/**
 * Tags上下文菜单状态
 */
export interface ITagsContextState {
  visible: boolean
  top: number
  left: number
  selectedTag: RouteRecordRawExtend
}
