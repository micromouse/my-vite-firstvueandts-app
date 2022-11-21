<template>
  <div class="container">
    <div class="handle-box">
      <el-select v-model="query.address" placeholder="地址" size="default" class="handle-select mr10">
        <el-option key="1" label="广东省" value="广东省" />
        <el-option key="2" label="湖南省" value="湖南省" />
      </el-select>
      <el-input v-model="query.name" placeholder="用户名" size="default" class="handle-input mr10" />
      <el-button type="primary" :icon="Search" size="default" @click="handleSearch">搜索</el-button>
      <el-button type="primary" :icon="Plus" size="default" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="datas" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column label="账户余额">
        <template #default="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="头像(查看大图)" align="center">
        <template #default="scope">
          <el-image
            class="table-td-thumb"
            :src="scope.row.thumb ?? getAssetsImage(scope.row.localThumb)"
            :z-index="10"
            :preview-src-list="[scope.row.thumb ?? getAssetsImage(scope.row.localThumb)]"
            preview-teleported
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">
            {{ scope.row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册时间" />
      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button text :icon="Edit" v-on:click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="query.pageIndex"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="query.pageSize"
        :total="pageTotal"
        v-on:current-change="handlePageChange"
        v-on:size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import {
  ElButton,
  ElImage,
  ElInput,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag
} from 'element-plus'
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue'
import useGlobalProperties from '@/hooks/useGlobalProperties'
import { AxiosInstance } from 'axios'
import { ITableItemUserInfo } from '@/typings/table'
import { IGDialogShow } from '@/typings/GDialog'
import TableItemView from './TableItemView.vue'

//定义TableView组件
export default defineComponent({
  components: {
    ElButton,
    ElImage,
    ElInput,
    ElOption,
    ElPagination,
    ElSelect,
    ElTable,
    ElTableColumn,
    ElTag
  },
  setup() {
    const globalProperties = useGlobalProperties()
    const datas = ref<ITableItemUserInfo[]>([])
    const pageTotal = ref(0)
    const query = reactive({ name: '', address: '', pageIndex: 1, pageSize: 2 })

    //组件已创建，执行搜索功能
    onMounted(() => handleSearch())

    //搜索
    const handleSearch = () => {
      globalProperties
        .resolve<AxiosInstance>('$axios')
        .get('/data/table.json')
        .then((res) => {
          datas.value = res.data.list
          pageTotal.value = res.data.pageTotal
        })
    }

    //处理分页
    const handlePageChange = (index: number) => {
      query.pageIndex = index
      handleSearch()
    }

    //处理页行数改变
    const handleSizeChange = (val: number) => {
      query.pageSize = val
      handleSearch()
    }

    //编辑用户信息行
    const handleEdit = (index: number, row: ITableItemUserInfo) => {
      globalProperties.resolve<IGDialogShow>('$gdialog').show(TableItemView, {
        title: '编辑用户',
        footer: {
          showOk: true
        },
        additions: {
          userInfo: { ...row },
          updateUserInfo: (userInfo: ITableItemUserInfo) => {
            datas.value[index].name = userInfo.name
            datas.value[index].address = userInfo.address
            datas.value[index].state = userInfo.state
          }
        }
      })
    }

    //删除用户信息行
    const handleDelete = (index: number) => {
      if (confirm('是否真的要删除当前行')) {
        datas.value.splice(index, 1)
      }
    }

    //新增用户信息
    const handleAdd = () => {
      globalProperties.resolve<IGDialogShow>('$gdialog').show(TableItemView, {
        title: '新增用户',
        footer: {
          showOk: true
        },
        additions: {
          userInfo: <ITableItemUserInfo>{ state: '失败' },
          updateUserInfo: (userInfo: ITableItemUserInfo) => {
            datas.value = datas.value.concat(userInfo)
          }
        }
      })
    }

    //获得assets文件夹下图片
    const getAssetsImage = (name: string) => new URL(`/src/assets/${name}.png`, import.meta.url).href

    //数据
    return {
      datas,
      pageTotal,
      query,
      Delete,
      Edit,
      Search,
      Plus,
      handleSearch,
      handlePageChange,
      handleSizeChange,
      handleEdit,
      handleDelete,
      handleAdd,
      getAssetsImage
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

.pagination {
  margin: 20px 0;
  text-align: right;
}
</style>
