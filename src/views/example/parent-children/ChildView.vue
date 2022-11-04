<template>
  <div>
    <h2>这是子组件</h2>
    <el-divider content-position="left">parent-children之间方法调用赋值等</el-divider>
    <div>v-model sync</div>
    <div>{{ childrenTitle }}</div>
    <el-button @click="changeChildrenTitle" size="default">change childrenTitle</el-button>
    <el-button @click="getChildData('来自于子组件的数据')" size="default">get child data</el-button>
    <el-button @click="invokeParentMethodByProxy()" size="default">invoke parentmethod by proxy</el-button>
  </div>
  <el-divider content-position="left">插槽</el-divider>
  <!--缺省插槽-->
  <slot>
    <h3>没有传入缺省插槽</h3>
  </slot>
  <!--具名插槽-->
  <header>
    <slot name="header">
      <h3>没有传入header插槽</h3>
    </slot>
  </header>
  <!--作用域插槽-->
  <footer>
    <slot name="footer" :title="title" :address="address">
      <h3>没有传入footer插槽</h3>
    </slot>
  </footer>
  <div>
    <slot name="testScope" testProerty="测试属性">
      <h3>没有传入[testScope]插槽</h3>
    </slot>
  </div>
  <hr />
  <grandchild-view />
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, PropType, ref } from 'vue'
import { ElButton, ElDivider } from 'element-plus'
import GrandchildView from './GrandchildView.vue'

export default defineComponent({
  props: {
    fatherName: {
      type: String,
      required: true
    },
    childrenTitle: {
      type: String,
      required: true
    },
    getChildData: {
      type: Function as PropType<(data: string) => void>,
      required: true
    }
  },
  components: {
    ElButton,
    ElDivider,
    GrandchildView
  },
  setup(props, context) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { proxy }: any = getCurrentInstance()
    const childRef = ref<string>('childRef')
    const title = ref('子组件作用域title值')
    const address = ref('子组件作用域address值')

    //子组件方法
    const childMethod = () => {
      return 'childMethod'
    }

    //更新childrenTitle值
    const changeChildrenTitle = () => {
      context.emit('update:childrenTitle', 'update childrenTitle in childview')
    }

    //挂载完成
    onMounted(() => {
      console.log('this is parentview v-model data:', props.childrenTitle)
      console.log('this is parentview father-name:', props.fatherName)
    })

    //使用当前实例上下文调用父组件方法
    const invokeParentMethodByProxy = () => {
      proxy.$parent.fatherMethod()
    }

    //数据
    return {
      childRef,
      title,
      address,
      childMethod,
      changeChildrenTitle,
      invokeParentMethodByProxy
    }
  }
})
</script>
