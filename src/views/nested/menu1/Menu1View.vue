<template>
  <div>
    <router-view v-slot="{ Component }">
      <el-alert :closable="false" title="menu1" type="success">
        <h1>Menu 1</h1>
        <component :is="Component" />
      </el-alert>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert } from 'element-plus'

export default defineComponent({
  components: {
    ElAlert
  }
})
</script>
