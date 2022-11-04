<!--svg图库：[阿里妈妈开发图库](https://www.iconfont.cn/)-->
<template>
  <svg aria-hidden="true" :class="svgClass">
    <use :xlink:href="symbolId" rel="external nofollow" :fill="color" />
  </svg>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
    const svgClass = computed(() => (props.className ? 'svg-icon ' + props.className : 'svg-icon'))

    //数据
    return {
      symbolId,
      svgClass
    }
  }
})
</script>
<style scoped lang="scss">
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
