<template>
  <h2>这是孙子组件</h2>
  <el-divider content-position="left">provider-inject使用</el-divider>
  <div>{{ title }}</div>

  <el-divider content-position="left">Teleport使用</el-divider>
  <div id="modal-container">teleport容器</div>
  <!--to container[#modal-container]-->
  <Teleport v-if="modalOpen" to="#modal-container">
    <el-divider content-position="left">包括这一行的下面都是Teleport的内容</el-divider>
    <div class="modal">
      <div>
        to container
        <el-divider content-position="left">功能</el-divider>
        <el-button size="default" @click="toggleModalOpen(false)">Close</el-button>
      </div>
    </div>
  </Teleport>

  <el-button v-if="!modalOpen" size="default" @click="toggleModalOpen(true)">Open</el-button>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { ElDivider, ElButton } from 'element-plus'

export default defineComponent({
  components: {
    ElDivider,
    ElButton
  },
  setup() {
    //inject的参数为provide过来的名称
    //ParentView.vue : provide('title', 'provide and inject using')
    const title = inject('title')
    const modalOpen = ref(false)

    //改变modalOpen状态
    const toggleModalOpen = (state: boolean) => {
      modalOpen.value = state
    }

    return {
      title,
      modalOpen,
      toggleModalOpen
    }
  }
})
</script>
<style lang="scss" scoped>
#modal-container {
  border: solid 1px #ff0000;
  width: 500px;
  padding: 5px;
}
</style>
