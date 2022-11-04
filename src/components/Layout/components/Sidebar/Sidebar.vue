<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo v-if="settings.sidebarLogo" :collapsed="!isCollapse" :title="settings.title" />

    <!--router nav-->
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical"
        mode="vertical"
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        :router="true"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElScrollbar, ElMenu } from 'element-plus'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useRouterStore } from '@/store/router'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  components: {
    ElScrollbar,
    ElMenu,
    Logo,
    SidebarItem
  },
  setup() {
    const appStore = useAppStore()
    const route = useRoute()

    //系统设置,是否可以折叠
    const settings = computed(() => appStore.settings)
    const isCollapse = computed(() => appStore.sidebar.opened)
    const routes = computed(() => useRouterStore().routes)

    //页面打开活动菜单
    const activeMenu = computed<string>(() => {
      const { meta, path } = route
      return typeof meta.activeMenu === 'string' ? meta.activeMenu : path
    })

    //数据
    return {
      settings,
      isCollapse,
      activeMenu,
      routes
    }
  }
})
</script>
<style lang="scss">
//fix open the item style issue
.el-menu-vertical {
  width: var(--side-bar-width);
}
</style>
