import path from 'path'
import { defineStore } from 'pinia'
import { RouteRecordRawExtend, RouteRecordRawExtendCollection } from '@/typings/router'
import { useAppStore } from './app'

//从路由集合中获得固定标签集合
function getAffixTags(routes: RouteRecordRawExtendCollection, basePath = '/') {
  let tags: RouteRecordRawExtendCollection = []

  routes.forEach((route) => {
    const tagPath = path.resolve(basePath, route.path)

    if (route.meta?.affix) {
      tags.push(Object.assign({}, route, { path: tagPath, fullPath: tagPath }))
    }

    if (route.children) {
      const childTags = getAffixTags(route.children as RouteRecordRawExtendCollection, tagPath)
      if (childTags.length > 0) {
        tags = [...tags, ...childTags]
      }
    }
  })

  return tags
}

//定义标签视图存储
export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      affixViews: [] as RouteRecordRawExtendCollection,
      views: [] as RouteRecordRawExtendCollection
    }
  },
  actions: {
    //初始化固定标签
    M_InitialAffixTags(routes: RouteRecordRawExtendCollection) {
      this.$patch((state) => {
        state.affixViews = getAffixTags(routes)

        const userpermissions = localStorage.getItem('userpermissions')?.split(',')
        state.affixViews.forEach((view) => {
          if (view.meta && view.meta.permission && (userpermissions?.indexOf(view.meta.permission) ?? -1) > -1) {
            this.M_addTag(view)
          }
        })
      })
    },
    M_addTag(route: RouteRecordRawExtend) {
      this.$patch((state) => {
        if (route.name && !state.views.some((v) => v.path === route.path)) {
          const appStore = useAppStore()

          //以达到最大标签数,删除最后一个标签
          if (state.views.length >= appStore.settings.tagsViewNum) {
            state.views.pop()
          }

          //添加新标签
          state.views.push(Object.assign({}, route))
        }
      })
    },
    M_deleteTag(route: RouteRecordRawExtend) {
      return new Promise<RouteRecordRawExtendCollection>((resolve) => {
        this.$patch((state) => {
          const index = state.views.findIndex((v) => v.path == route.path)
          if (index != -1) {
            state.views.splice(index, 1)
          }

          //返回删除项后的结果
          resolve([...state.views])
        })
      })
    },
    M_deleteOtherTags(route: RouteRecordRawExtend) {
      return new Promise<RouteRecordRawExtendCollection>((resolve) => {
        this.$patch((state) => {
          state.views = state.views.filter((v) => v.meta?.affix || v.path == route.path)

          //返回删除其他项后的结果
          return resolve([...state.views])
        })
      })
    },
    M_deleteAllTags() {
      return new Promise<RouteRecordRawExtendCollection>((resolve) => {
        this.$patch((state) => {
          state.views = state.views.filter((v) => v.meta?.affix)
          return resolve([...state.views])
        })
      })
    }
  }
})
