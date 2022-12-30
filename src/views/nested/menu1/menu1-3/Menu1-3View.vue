<template>
  <div style="padding: 20px">
    <el-alert :closable="true" title="menu 1-3" type="error">
      <h2>this is Menu 1-3</h2>
    </el-alert>
  </div>
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
