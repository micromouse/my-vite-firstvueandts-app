<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <div style="padding: 15px">
        <el-card title="menu 1-2">
          <h2 style="padding: 20px">Menu 1-2</h2>
          <component :is="Component" :key="route.path" />
        </el-card>
      </div>
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
