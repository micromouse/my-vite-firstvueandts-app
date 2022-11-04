<template>
  <template v-if="!item.hidden">
    <!--是菜单项-->
    <template v-if="isSidebarItem(item)">
      <el-menu-item :index="resolvePath(item)">
        <sidebar-item-icon :elIconName="item.meta?.elIconName" :svgIconName="item.meta?.svgIconName" />
        <template v-slot:title>{{ item.meta?.title }}</template>
      </el-menu-item>
    </template>
    <!--有子菜单-->
    <el-sub-menu v-else :index="resolvePath(item)" popper-append-to-body>
      <!--<template v-slot:title> 等效于 <template #title>-->
      <template #title>
        <sidebar-item-icon :elIconName="item.meta?.elIconName" :svgIconName="item.meta?.svgIconName" />
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :base-path="resolvePath(item)"
        :item="child"
      ></sidebar-item>
    </el-sub-menu>
  </template>
</template>
<script lang="ts">
import path from 'path'
import { defineComponent, PropType } from 'vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { IRouteItemInfo, RouteRecordRawExtend } from '@/typings/router'
import SidebarItemIcon from './SidebarItemIcon.vue'

export default defineComponent({
  props: {
    basePath: {
      type: String,
      required: true
    },
    item: {
      type: Object as PropType<RouteRecordRawExtend>,
      required: true
    }
  },
  components: {
    ElMenuItem,
    ElSubMenu,
    SidebarItemIcon
  },
  setup(props) {
    //解析当前SidebarItem请求路径
    const resolvePath = (item: RouteRecordRawExtend) => {
      //是外部链接
      if (/^(https?:|mailto:|tel:)/.test(item.path)) {
        //当前项是外部链接
        return item.path
      } else if (/^(https?:|mailto:|tel:)/.test(props.basePath)) {
        //父项是外部链接
        return props.basePath
      }

      return path.resolve(props.basePath, item.path)
    }

    //当前项是SidebarItem
    const isSidebarItem = (item: RouteRecordRawExtend) => {
      let childItemCount = item.children?.filter((r: IRouteItemInfo) => !r.hidden)?.length ?? 0
      return !item.alwaysShow && childItemCount <= 1
    }

    //数据
    return {
      resolvePath,
      isSidebarItem
    }
  }
})
</script>
