<template>
  <el-form-item label="公告内容" prop="content">
    <el-input v-model="content" size="default" />
  </el-form-item>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const content = ref('请输入公告内容......')

    return {
      content
    }
  }
})
</script>
