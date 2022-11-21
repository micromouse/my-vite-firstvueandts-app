<template>
  <div>
    <h2>显示对话框演示</h2>
    <hr />
    <el-button v-on:click="toAboutByParams()" size="default">to AboutView By Params</el-button>
    <el-button v-on:click="toAboutByQuery()" size="default">to AboutView By Query</el-button>
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
import Dialog3View from './Dialog3View.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ElButton,
    ElDivider
  },
  setup() {
    const router = useRouter()
    const globalProperties = useGlobalProperties()
    const dialog1Return = ref('')

    /**
     * 跳转到AboutView视图
     * Discarded invalid param(s) "paramsContent" when navigating.
     * https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
     * */
    const toAboutByParams = () => {
      router.push({
        name: 'about',
        params: { paramsContent: '这是从ShowdialogView.vue传出的参数内容' }
      })
    }

    //使用Query跳转到About
    const toAboutByQuery = () => {
      router.push({
        path: '/about/index',
        query: { id: '这是从ShowdialogView.vue传出的id值' }
      })
    }

    //显示对话框1
    const showDialog1 = () => {
      globalProperties.resolveGDialog().show(Dialog1View, {
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
      globalProperties.resolveGDialog().show(Dialog3View, {
        title: '对话框3的标题'
      })
    }

    //抛出异常
    const throwException = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hello: any = {}
      console.log('hello.say', hello.say('error message'))
      throw '抛出一个异常'
    }

    //数据
    return {
      toAboutByParams,
      toAboutByQuery,
      showDialog1,
      showDialog3,
      dialog1Return,
      throwException
    }
  }
})
</script>
