<template>
  <h2>对话框2</h2>
  <el-divider content-position="left">options</el-divider>
  <div v-for="(value, key) in dialogAdditionProps" :key="key">{{ key + ' : ' + value }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElDivider } from 'element-plus'
import { IGdialogAdditionProps } from '@/typings/GDialog'

export default defineComponent({
  props: {
    dialogAdditionProps: {
      type: Object as PropType<IGdialogAdditionProps>,
      required: true
    }
  },
  components: {
    ElDivider
  },
  setup(props) {
    //处理Ok按钮click事件
    const handleOk = () => {
      props.dialogAdditionProps.handledOk('我是Dialog2View.handleOk方法')
      console.log('已单击Ok按钮')
      props.dialogAdditionProps.close()
    }

    return {
      handleOk
    }
  }
})
</script>
