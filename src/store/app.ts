import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebar: { opened: true },
      device: 'desktop',
      settings: window.appConfig.settings
    }
  },
  actions: {
    /**
     * @description - 切换Sidebar
     */
    M_SwitchSidebar() {
      this.$patch((state) => (state.sidebar.opened = !state.sidebar.opened))
    }
  }
})
