import { defineStore } from 'pinia'
import { RouteRecordRawExtendCollection } from '@/typings/router'

export const useRouterStore = defineStore('router', {
  state: () => {
    return {
      routes: [] as RouteRecordRawExtendCollection
    }
  },
  actions: {
    //设置扩展路由集合
    M_SetRoutes(_routes: RouteRecordRawExtendCollection) {
      this.$patch((state) => (state.routes = _routes))
    }
  }
})
