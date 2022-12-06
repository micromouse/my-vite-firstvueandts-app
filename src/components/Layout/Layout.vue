<template>
  <div class="layout-wrapper" :class="classObj">
    <!--left side-->
    <Sidebar v-if="settings.showLeftMenu" class="sidebar-container" />
    <!--right container-->
    <div class="main-container">
      <Navbar v-if="settings.showTopNavbar" />
      <TagsView v-if="settings.showTagsView" />
      <AppMain />
    </div>
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/infrustructures/store/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
  setup() {
    const appStore = useAppStore()

    const settings = computed(() => appStore.settings)
    const opened = computed(() => appStore.sidebar.opened)
    const classObj = computed(() => {
      return {
        closeSidebar: !opened.value,
        hideSidebar: !settings.value.showLeftMenu
      }
    })

    //数据
    return {
      settings,
      opened,
      classObj
    }
  }
})
</script>
<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--side-bar-width);
  position: relative;
  border-left: 1px solid var(--layout-border-left-color);
}
.sidebar-container {
  transition: width 0.28s;
  width: var(--side-bar-width) !important;
  background-color: var(--el-menu-bg-color);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
