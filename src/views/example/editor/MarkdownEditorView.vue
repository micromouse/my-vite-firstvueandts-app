<template>
  <md-editor v-model="state.text" :code-theme="state.codeTheme" :theme="state.theme"></md-editor>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import MdEditor, { Themes } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default defineComponent({
  components: {
    MdEditor
  },
  setup() {
    const state = reactive({
      text: '## hello world',
      theme: <Themes>'dark',
      previewTheme: 'default',
      codeTheme: 'github'
    })

    return {
      state
    }
  }
})
</script>
