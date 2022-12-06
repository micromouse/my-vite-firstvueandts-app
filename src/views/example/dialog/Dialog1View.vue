<template>
  <h2>对话框1</h2>
  <hr />
  <el-button @click="dialogAdditionProps.close()" size="default">Close</el-button>
  <el-button @click="showDialog2" size="default">显示对话框2</el-button>
  <el-divider content-position="left">options</el-divider>
  <div v-for="(value, key) in dialogAdditionProps" :key="key">{{ key + ' : ' + value }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import { IGdialogAdditionProps, IGDialogShow } from '@/typings/GDialog'
import Dialog2View from './Dialog2View.vue'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'

export default defineComponent({
  props: {
    dialogAdditionProps: {
      type: Object as PropType<IGdialogAdditionProps>,
      required: true
    }
  },
  components: {
    ElButton,
    ElDivider
  },
  setup() {
    const globalProperties = useGlobalProperties()

    //显示对话框2
    const showDialog2 = () => {
      globalProperties.resolve<IGDialogShow>('$gdialog').show(Dialog2View, {
        title: '这是我的对话框2',
        footer: {
          showOk: true
        },
        additions: {
          name: '张三',
          age: 30,
          address: '一环路南三段跳伞塔以前是真的有个塔,周末很多爱好者在那儿跳伞',
          education: '大学',
          option1: 'option1',
          option2: 'option2',
          option3: 'option3',
          option4: 'option4',
          option5: 'option5',
          handledOk: (data: string) => {
            //Dialog2View.Ok按钮单击事件已处理
            console.log('Dialog1View接收到了Dialog2View.Ok按钮单击事件结果:', data)
          }
        }
      })
    }

    return {
      showDialog2
    }
  }
})
</script>
