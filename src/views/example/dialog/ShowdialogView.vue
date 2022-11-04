<template>
  <div>
    <h2>显示对话框演示</h2>
    <hr />
    <el-button v-on:click="showDialog1()" size="default">显示对话框1</el-button>
    <el-button @click="showDialog3()" size="default">显示对话框3</el-button>
    <el-button @click="throwException()" size="default">未处理异常</el-button>
    <el-divider content-position="left">对话框1返回值</el-divider>
    {{ dialog1Return }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import Dialog1View from './Dialog1View.vue'
import Dialog1Buttons from './Dialog1Buttons.vue'
import useGlobalProperties from '@/hooks/useGlobalProperties'
import { IGDialogShow } from '@/typings/GDialog'
import Dialog3View from './Dialog3View.vue'

export default defineComponent({
  components: {
    ElButton,
    ElDivider
  },
  setup() {
    const globalProperties = useGlobalProperties()
    const dialog1Return = ref('')

    //显示对话框1
    const showDialog1 = () => {
      globalProperties.resolve<IGDialogShow>('$gdialog').show(Dialog1View, {
        title: '这是对话框1标题',
        footer: {
          buttons: Dialog1Buttons
        },
        additions: {
          onConfirmClose: () => confirm('是否真的要关闭'),
          handled: (value: string) => {
            dialog1Return.value = value
            console.log('对话框1已处理:', value)
          }
        }
      })
    }

    //显示对话框3
    const showDialog3 = () => {
      globalProperties.resolve<IGDialogShow>('$gdialog').show(Dialog3View, {
        title: '对话框3的标题'
      })
    }

    //抛出异常
    const throwException = () => {
      document.getElementById('cc').innerHTML = 'cc'
      throw '抛出一个异常'
    }

    //数据
    return {
      showDialog1,
      showDialog3,
      dialog1Return,
      throwException
    }
  }
})
</script>
