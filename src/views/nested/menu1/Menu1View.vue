<template>
  <div>
    <router-view v-slot="{ Component }">
      <el-card title="menu1">
        <h1>Menu 1</h1>
        <component :is="Component" />
      </el-card>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
