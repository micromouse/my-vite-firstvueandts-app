<template>
  <div>
    <h2>这是父组件</h2>
    <el-button @click="invokeChildMethod" size="default">childMethod</el-button>
    <hr />
    <child-view
      ref="childViewRef"
      v-model:childrenTitle="parentTitle"
      :getChildData="getChildData"
      father-name="/example/parent-children/parentview.vue"
    >
      <template v-slot:default>
        <div>这是默认插槽</div>
      </template>
      <!--作用域插槽[v-slot:footer],取值方式1-->
      <template #footer="{ address, title }">
        <span>footer插槽</span>
        <div>子组件作用域传的值:{{ '[' + address + '] / [' + title + ']' }}</div>
      </template>
      <!--作用域插槽[v-slot:testScope],取值方式2-->
      <template v-slot:testScope="slotProperty">
        <span>[testScope]作用域插槽</span>
        <div>{{ 'testScope作用域插槽testProerty值:[' + slotProperty.testProerty + ']' }}</div>
      </template>
    </child-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, provide, ref, watch } from 'vue'
import { ElButton } from 'element-plus'
import ChildView from './ChildView.vue'

export default defineComponent({
  components: {
    ElButton,
    ChildView
  },
  setup() {
    //ref泛型类型除了指定any外,还可以指定InstanceType<typeof ChildView>
    const childViewRef = ref<InstanceType<typeof ChildView>>()
    const parentTitle = ref('parent title')

    //挂载完成
    onMounted(() => {
      console.log('childViewRef.value:', childViewRef.value)
    })

    //调用子组件方法
    const invokeChildMethod = () => {
      console.log('ChildView.childMethod():', childViewRef.value?.childMethod())
      console.log('ChildView.childRef:', childViewRef.value?.childRef)
    }

    //获得子组件数据
    const getChildData = (data: string) => {
      console.log('得到子组件的信息：', data)
    }

    //父组件方法
    const fatherMethod = () => {
      console.log('正在执行父组件方法')
    }

    //provide : 在不知道要多少层的子组件下调用参数
    provide('title', 'provide and inject using')

    //监控parentTitle值变化
    watch(
      () => parentTitle.value,
      (newValue, oldValue) => console.log(`触发parentTitle更新，旧值:${oldValue},新值:${newValue}`),
      { immediate: true }
    )

    return {
      //必须暴露数据,不然onMounted中childViewRef.value=undefined
      childViewRef,
      parentTitle,
      invokeChildMethod,
      getChildData,
      fatherMethod
    }
  }
})
</script>
