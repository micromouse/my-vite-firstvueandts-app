<!--面包屑:显示当前请求完整路径,支持单击切换到上级路由-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!--has transition Judging by settings.mainNeedAnimation-->
    <transition-group v-if="settings.mainNeedAnimation" name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in paths" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === paths.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="path_click(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
    <!--no transition-->
    <template v-else>
      <el-breadcrumb-item v-for="(item, index) in paths" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === paths.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="path_click(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, TransitionGroup, watch } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import { IRouteItemInfo } from '@/typings/router'

//定义组件
export default defineComponent({
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem,
    TransitionGroup
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    //路由改变处理事件
    const paths = ref(new Array<RouteLocationMatched>())
    const route_Changed = () => {
      /**
       * route.matched : RouteRecordNormalized[]
       * 与给定路由地址匹配的标准化的路由记录数组
       */
      let matched = route.matched.filter((item) => item.meta?.title)
      paths.value = matched.filter((item) => item.meta?.breadcrumb !== false)
    }

    //处理路由path click事件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const path_click = (item: any) => {
      let { redirect, path } = item as IRouteItemInfo
      if (redirect) {
        router.push(redirect)
        return
      }

      if (path) {
        //从path中提取的已解码参数字典
        const { params } = route
        const url = compile(path).call(params)
        router.push(url)
      }
    }

    //侦听路由变化
    watch(
      () => route.path,
      () => route_Changed(),
      { immediate: true }
    )

    //在挂载开始之前被调用：相关的 render 函数首次被调用
    onBeforeMount(() => route_Changed())

    //数据
    return {
      settings: window.appConfig.settings,
      paths,
      path_click
    }
  }
})
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: var(--breadcrumb-no-redirect);
    cursor: text;
  }
}
</style>
