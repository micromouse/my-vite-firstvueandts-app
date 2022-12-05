import { nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTagsViewStore } from '@/infrustructures/store/tagsView'
import { IRouteItemInfo, RouteRecordRawExtend } from '@/typings/router'
import { ITagsContextState } from '@/typings/tags'
import { useRouterStore } from '@/infrustructures/store/router'
import useCurrentInstance from './useCurrentInstance'

/**
 * @param contextState - tags上下文菜单状态
 * @returns - [
 *  isActiveTag,
 *  isAffix,
 *  refreshSelectedTag,
 *  closeSelectedTag,
 *  closeOtherTags,
 *  closeAllTags,
 *  openContextMenu,
 *  closeContextMenu
 * ]
 */
export default function (contextState: ITagsContextState) {
  const router = useRouter()
  const route = useRoute()
  const routerStore = useRouterStore()
  const tagsViewStore = useTagsViewStore()
  const { proxy } = useCurrentInstance()

  //当前Tag是否活动Tag
  const isActiveTag = (_route: IRouteItemInfo) => _route.path === route.path

  //当前Tag是否固定Tag
  const isAffix = (_route: IRouteItemInfo) => _route.meta?.affix

  //刷新选择的Tag
  const refreshSelectedTag = (_route: RouteRecordRawExtend) => {
    const { fullPath } = _route
    nextTick(() => {
      router.replace({ path: `/redirect${fullPath}` })
    })
  }

  //关闭选择的Tag
  const closeSelectedTag = (_route: RouteRecordRawExtend) => {
    tagsViewStore.M_deleteTag(_route).then((_views) => {
      if (isActiveTag(_route)) {
        router.push(_views.slice(-1)[0].fullPath ?? '/')
      }
    })
  }

  //关闭其他Tags
  const closeOtherTags = () => {
    router.push(contextState.selectedTag)
    tagsViewStore.M_deleteOtherTags(contextState.selectedTag)
  }

  //关闭所有标签
  const closeAllTags = (_route: RouteRecordRawExtend) => {
    tagsViewStore.M_deleteAllTags().then((_views) => {
      //当前标签是固定标签
      if (_route.meta?.affix) {
        return
      }

      router.push(_views.slice(-1)[0].fullPath ?? '/')
    })
  }

  //打开上下文菜单
  const openContextMenu = (_route: RouteRecordRawExtend, e: MouseEvent) => {
    /**
     * proxy.$el - 当前DOM元素[div.#tags-view-container]
     * proxy.$el.getBoundingClientRect() - DOM元素到浏览器可视范围的距离
     */
    const offsetLeft = proxy?.$el.getBoundingClientRect().left
    const offsetWidth = proxy?.$el.offsetWidth
    const maxLeft = offsetWidth - 105
    const left = e.clientX - offsetLeft + 15

    //上下文菜单信息
    contextState.visible = true
    contextState.left = left > maxLeft ? maxLeft : left
    contextState.top = e.clientY
    contextState.selectedTag = _route
  }

  //关闭上下文菜单
  const closeContextMenu = () => (contextState.visible = false)

  //实例挂载完成,初始化标签
  onMounted(() => {
    tagsViewStore.M_InitialAffixTags(routerStore.routes)
    tagsViewStore.M_addTag(route as unknown as RouteRecordRawExtend)
  })

  //返回数据
  return {
    isActiveTag,
    isAffix,
    refreshSelectedTag,
    closeSelectedTag,
    closeOtherTags,
    closeAllTags,
    openContextMenu,
    closeContextMenu
  }
}
