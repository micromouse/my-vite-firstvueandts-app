<template>
  <div class="container">
    <div class="handle-box">
      <el-select v-model="query.address" placeholder="地址" size="default" class="handle-select mr10">
        <el-option key="1" label="广东省" value="广东省" />
        <el-option key="2" label="湖南省" value="湖南省" />
      </el-select>
      <el-input v-model="query.name" placeholder="用户名" size="default" class="handle-input mr10" />
      <el-button type="primary" :icon="Search" size="default" @click="handleSearch">搜索</el-button>
      <el-button type="primary" :icon="Plus" size="default">新增</el-button>
    </div>
    <pre>{{ datas }}</pre>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
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

//定义TableView组件
export default defineComponent({
  components: {
    ElButton,
    ElInput,
    ElOption,
    ElSelect
  },
  setup() {
    const globalProperties = useGlobalProperties()
    const datas = ref<ITableItem[]>([])
    const count = ref(0)
    const query = reactive({ name: '', address: '' })

    //组件已创建，执行搜索功能
    onMounted(() => handleSearch())

    //搜索
    const handleSearch = () => {
      console.log('query', query)
      globalProperties
        .resolve<AxiosInstance>('$axios')
        .get('/data/table.json')
        .then((res) => {
          datas.value = res.data.list
          count.value = res.data.pageTotal
        })
    }

    return {
      datas,
      count,
      query,
      Search,
      Plus,
      handleSearch
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
