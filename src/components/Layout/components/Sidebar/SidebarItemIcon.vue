<template>
  <!--https://element-plus.gitee.io/zh-CN/component/icon.html-->
  <el-icon v-if="elIconName" class="el-svg-icon">
    <component :is="elIcon" />
  </el-icon>
  <svg-icon v-else-if="svgIconName" :icon-class="svgIconName" className="sub-el-icon"></svg-icon>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

export default defineComponent({
  props: {
    svgIconName: {
      type: String,
      required: false
    },
    elIconName: {
      type: String,
      required: false
    }
  },
  components: {
    ElIcon
  },
  setup(props) {
    const elIcon = computed(() => (props.elIconName ? Icons[props.elIconName as keyof typeof Icons] : null))

    return {
      elIcon
    }
  }
})
</script>
<style scoped lang="scss">
.el-svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  right: 3px;
  font-size: var(--sidebar-el-icon-size);
  text-align: left !important;
}
</style>
