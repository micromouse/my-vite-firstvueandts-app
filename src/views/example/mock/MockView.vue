<template>
  <div>
    <h2>mockjs测试</h2>
    <hr />
    <el-button @click="getData()" size="default">get data by axios</el-button>
    <el-divider content-position="left">axios响应数据</el-divider>
    <div v-for="(value, key) in mocksRef" :key="key">{{ key + ' : ' + JSON.stringify(value) }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import { AxiosInstance } from 'axios'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'
import '@/application/example/mock/Mockjs'

export default defineComponent({
  components: {
    ElButton,
    ElDivider
  },
  setup() {
    const globalProperties = useGlobalProperties()
    const mocksRef = ref('')

    //使用axios获得mock数据
    const getData = () => {
      globalProperties
        .resolve<AxiosInstance>('$axios')({
          url: '/mocks',
          method: 'get'
        })
        .then((res) => {
          mocksRef.value = res.data
        })
    }

    return {
      getData,
      mocksRef
    }
  }
})
</script>
