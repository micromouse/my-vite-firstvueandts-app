<template>
  <div>
    <router-view v-slot="{ Component }">
      <div style="padding: 15px">
        <el-alert :closable="false" title="menu 1-1" type="warning">
          <h2>Menu 1-1</h2>
          <component :is="Component" />
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
