<template>
  <div>
    <div class="tree-wrapper">
      <el-tree
        ref="tree"
        :data="permissions"
        :default-checked-keys="checkedKeys"
        :props="{ children: 'children', label: 'label' }"
        :check-strictly="true"
        node-key="id"
        default-expand-all
        show-checkbox
      />
    </div>
    <el-button size="default" type="primary" @click="savePermissions_click">保存权限</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRouterStore } from '@/infrustructures/store/router'
import { RouteRecordRawExtendCollection } from '@/typings/router'
import { ElTree } from 'element-plus'

/**
 * 权限数据接口
 */
interface IPermissionData {
  id: string
  label: string
  children: Array<IPermissionData>
}

export default defineComponent({
  setup() {
    const routerStore = useRouterStore()
    const permissions = ref<IPermissionData[]>([])
    const checkedKeys = ref(['demo', 'demo.editorv3', 'nested.menu1.menu1-2'])
    const tree = ref<InstanceType<typeof ElTree>>()

    /**
     * 从路由记录集合添加权限数据
     * @param _children - 子路由记录集合
     * @param parentPermission - 当前父路由记录
     */
    const addPermissionData = (_children: RouteRecordRawExtendCollection, parentPermission?: IPermissionData) => {
      _children.forEach((value) => {
        if (value.meta && value.meta.permission) {
          const _permission: IPermissionData = {
            id: value.meta.permission,
            label: value.meta.title,
            children: new Array<IPermissionData>()
          }
          if (parentPermission) {
            parentPermission.children.push(_permission)
          } else {
            permissions.value.push(_permission)
          }

          //添加子权限数据
          if (value.children && value.children.length > 0) {
            addPermissionData(value.children, _permission)
          }
        }
      })
    }

    /**
     * 单击保存权限
     */
    const savePermissions_click = () => {
      console.log('checkedKeys', tree.value?.getCheckedKeys(false))
    }

    /**
     * onBeforeMount - 初始化权限数据(onMounted函数default-checked-keys无效)
     */
    onBeforeMount(() => addPermissionData(routerStore.routes))

    return {
      permissions,
      checkedKeys,
      tree,
      savePermissions_click
    }
  }
})
</script>
<style lang="scss" scoped>
.tree-wrapper {
  max-width: 500px;
}
</style>
