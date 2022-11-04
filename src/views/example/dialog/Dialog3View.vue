<template>
  <h2>对话框3</h2>
  <hr />
  <pre v-for="(value, key) in dialogAdditionProps" :key="key">{{ key + ' ' + value }}</pre>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IGdialogAdditionProps } from '@/typings/GDialog'

export default defineComponent({
  props: {
    dialogAdditionProps: {
      type: Object as PropType<IGdialogAdditionProps>,
      required: true
    }
  }
})
</script>
