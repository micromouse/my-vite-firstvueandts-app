<!--汉堡包:切换Sidebar收缩/展开-->
<template>
  <div class="hamburger-container" v-on:click="switchSidebar">
    <svg-icon icon-class="hamburger" :class="{ 'is-active': isActive }" class="hamburger-style" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: false
    },
    switchSidebar: {
      type: Function as PropType<() => void>,
      required: true
    }
  }
})
</script>
<style scoped lang="scss">
.hamburger-container {
  padding: 0 12px;
}
.hamburger-style {
  color: var(--hamburger-color);
  width: var(--hamburger-width);
  height: var(--hamburger-height);
  cursor: pointer;
}

.hamburger-style.is-active {
  transform: rotate(180deg);
}
</style>
