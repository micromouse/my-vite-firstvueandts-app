<template>
  <el-button @click="handle_click" type="primary" size="default">Handle</el-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  components: {
    ElButton
  },
  setup(props) {
    //Handle按钮单击事件处理
    const handle_click = () => {
      props.dialog.dialogAdditionProps.handled('对话框1已处理,这是对话框1处理结果返回的值')
      props.dialog.dialogAdditionProps.close()
    }

    return {
      handle_click
    }
  }
})
</script>
