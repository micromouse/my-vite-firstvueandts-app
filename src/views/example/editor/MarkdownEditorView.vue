<template>
  <el-form-item label="公告内容" prop="content">
    <h2>暂时还不能使用</h2>
  </el-form-item>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const content = ref('')

    return {
      content
    }
  }
})
</script>
