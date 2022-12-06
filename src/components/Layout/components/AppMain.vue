<template>
  <div class="app-main" :class="{ 'show-tag-view': settings.showTagsView }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/infrustructures/store/app'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const appStore = useAppStore()

    //缺省设置,key
    const settings = computed(() => appStore.settings)
    const key = computed(() => route.path)

    //数据
    return {
      settings,
      key
    }
  }
})
</script>
<style scoped lang="scss">
.app-main {
  padding: var(--app-main-padding);
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
  background-color: var(--app-main-background);
}
.show-tag-view {
  height: calc(100vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)}) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
