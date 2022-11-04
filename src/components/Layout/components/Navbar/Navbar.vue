<!--导航条:汉堡包[切换Sidebar收缩/展开]/面包屑[显示当前请求完整路径]/个人中心-->
<template>
  <div class="navbar rowBC reset-el-dropdown">
    <div class="rowSC">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        :switch-sidebar="switchSidebar"
        class="hambuger-container"
      />
      <bread-crumb class="breadcrumb-container" />
    </div>
    <div v-if="settings.ShowDropDown" class="right-menu">
      <right-menu />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import Hamburger from './Hamburger.vue'
import BreadCrumb from './BreadCrumb.vue'
import RightMenu from './RightMenu.vue'

export default defineComponent({
  components: {
    Hamburger,
    BreadCrumb,
    RightMenu
  },
  setup() {
    const appStore = useAppStore()

    //Sidebar是否已打开
    const opened = computed(() => appStore.sidebar.opened)

    //切换Sidebar打开状态
    const switchSidebar = () => {
      appStore.M_SwitchSidebar()
    }

    //数据
    return {
      settings: window.appConfig.settings,
      opened,
      switchSidebar
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--nav-bar-background);
  box-shadow: var(--nav-bar-box-shadow);
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 40px;
  background-color: var(--nav-bar-right-menu-background);
}
</style>
