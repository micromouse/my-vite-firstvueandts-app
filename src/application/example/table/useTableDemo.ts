import { AxiosInstance } from 'axios'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'
import { ITableItemUserInfo } from '@/typings/examples/table'
import { onMounted, reactive, ref } from 'vue'
import TableItemView from '@/views/example/table/TableItemView.vue'

/**
 * 使用Table演示业务
 * @returns - Table演示业务
 */
export default function useTableDemo() {
  const globalProperties = useGlobalProperties()
  const datas = ref<ITableItemUserInfo[]>([])
  const pageTotal = ref(0)
  const query = reactive({ name: '', address: '', pageIndex: 1, pageSize: 2 })

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
    globalProperties.resolveGDialog().show(TableItemView, {
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
    globalProperties.resolveGDialog().show(TableItemView, {
      title: '新增用户',
      footer: {
        showOk: true,
        OkTitle: 'Save'
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

  //组件已创建，执行搜索功能
  onMounted(() => handleSearch())

  //数据
  return {
    datas,
    pageTotal,
    query,
    handleSearch,
    handlePageChange,
    handleSizeChange,
    handleEdit,
    handleDelete,
    handleAdd,
    getAssetsImage
  }
}
