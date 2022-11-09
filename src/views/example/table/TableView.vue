<template>
  <div>
    <h2>table演示</h2>
    <pre>{{ datas }}</pre>
    <h3>page count:{{ count }}</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useGlobalProperties from '@/hooks/useGlobalProperties'
import { AxiosInstance } from 'axios'

//表格项信息
interface ITableItem {
  id: number
  name: string
  money: string
  state: string
  date: string
  address: string
}

//
export default defineComponent({
  setup() {
    const globalProperties = useGlobalProperties()
    const datas = ref<ITableItem[]>([])
    const count = ref(0)

    onMounted(() => {
      globalProperties
        .resolve<AxiosInstance>('$axios')
        .get('/data/table.json')
        .then((res) => {
          datas.value = res.data.list
          count.value = res.data.pageTotal
        })
    })

    return {
      datas,
      count
    }
  }
})
</script>
