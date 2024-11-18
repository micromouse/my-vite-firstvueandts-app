<template>
  <h2>mqtt发布接收测试</h2>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'

export default defineComponent({
  setup() {
    const globalProperties = useGlobalProperties()
    const f = (name: string) => '' + name

    const s = f('hello')
  }
})
</script>
