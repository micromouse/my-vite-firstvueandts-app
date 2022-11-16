<template>
  <div>
    <h1>
      {{ paramsContent }}
      <br />
      {{ id }}
    </h1>
    <br />
    <div class="card">
      <el-button type="primary" size="default" @click="count++">count is {{ count }}</el-button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code>
        to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>
      , the official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: '没有传入id值'
    },
    paramsContent: {
      type: String,
      default: '路由没有传入消息'
    }
  },
  components: {
    ElButton
  },
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
})
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
