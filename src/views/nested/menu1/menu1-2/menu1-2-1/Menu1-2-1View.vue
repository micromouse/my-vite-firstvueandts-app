<template>
  <el-alert :closable="false" title="menu 1-2-1" type="info">
    <h2>this is Menu 1-2-1</h2>
  </el-alert>
</template>
<script lang="ts">
import { ElAlert } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ElAlert
  }
})
</script>
