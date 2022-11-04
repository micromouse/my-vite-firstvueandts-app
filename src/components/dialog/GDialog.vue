<template>
  <el-dialog
    class="subDialog"
    v-model="dialogVisible"
    v-bind="options"
    :title="options.title"
    :width="options.width"
    :before-close="onBeforeClose"
    draggable
    align-center
  >
    <div>
      <component ref="dialogRef" :is="component" :dialogAdditionProps="dialogAdditionProps" />
    </div>
    <template v-if="options.footer?.showFooter" v-slot:footer>
      <span class="el-dialog__footer">
        <component v-if="options.footer?.buttons" :is="options.footer.buttons" :dialog="dialogRef" />
        <el-button v-if="options.footer?.showOk" @click="dialogRef.handleOk()" size="default">Ok</el-button>
        <el-button v-if="options.footer?.showCancel" @click="dialogVisible = false" size="default">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, defineComponent, PropType, ref, watch } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { IGDialogCreateOptions } from '@/typings/GDialog'

export default defineComponent({
  components: {
    ElDialog,
    ElButton
  },
  props: {
    component: {
      type: Object as () => Component,
      required: true
    },
    options: {
      type: Object as () => IGDialogCreateOptions,
      required: true
    },
    remove: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dialogRef: any = ref(null)
    const dialogVisible = ref(true)

    /**
     * 对话框关闭之前回调处理
     * --------------------
     * 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。
     * 如果你在 footer 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 before-close 的相关逻辑。
     * @param done - 关闭对话框前要执行的操作
     */
    const onBeforeClose = (done: () => void) => {
      if (props.options.additions?.onConfirmClose) {
        var confirm = props.options.additions.onConfirmClose()
        if (!confirm) {
          return false
        }
      }
      done()
    }

    //监测对话框关闭
    watch(
      () => dialogVisible.value,
      (value) => {
        if (!value) props.remove()
      },
      { immediate: true }
    )

    //对话框子组件属性
    const dialogAdditionProps = Object.assign({}, props.options.additions, {
      close: () => (dialogVisible.value = false)
    })

    //数据
    return {
      dialogVisible,
      dialogRef,
      dialogAdditionProps,
      onBeforeClose
    }
  }
})
</script>

<style lang="scss">
.subDialog {
  &.el-dialog {
    z-index: 99;
    background-color: #ffffff;
    //使用了不能垂直居中
    //margin-top: 20% !important;
  }
  .el-dialog__header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 25px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
  .el-dialog__headerbtn {
    font-size: 20px;
    width: 40px;
    height: 40px;
  }
  .el-dialog__title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .el-dialog__body {
    box-sizing: border-box;
    padding: 20px 25px;
  }
  .el-dialog__footer {
    text-align: right;
    height: 60px;
    line-height: 60px;
    padding: 0;
    margin-right: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
