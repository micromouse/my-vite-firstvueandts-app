<template>
  <h2>mqtt发布接收测试</h2>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'

export default defineComponent({
  setup() {
    const globalProperties = useGlobalProperties()
    globalProperties.resolveMqttClient().Subscribe('myTopic')
  }
})
</script>
