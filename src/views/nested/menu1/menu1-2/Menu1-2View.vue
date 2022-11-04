<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <div style="padding: 15px">
        <el-alert :closable="false" title="menu 1-2" type="error">
          <component :is="Component" :key="route.path" />
        </el-alert>
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
