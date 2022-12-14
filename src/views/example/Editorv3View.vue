<template>
  <div>
    <h2>Editor V3版本演示</h2>
    <br />
    <div class="container">
      <Toolbar class="toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
      <Editor
        class="editor"
        v-model="valueHtml"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="handleEditorCreated"
      />
      <el-button type="primary" size="default" @click="submit_click">提交</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'
import { AxiosInstance } from 'axios'
import { IDomEditor } from '@wangeditor/core/dist/core/src/editor/interface'

export default defineComponent({
  components: {
    Editor,
    Toolbar
  },
  setup() {
    /**
     * 编辑器实例，必须用 shallowRef
     * 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
     * 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。
     */
    const editorRef = shallowRef<IDomEditor | undefined>()
    const valueHtml = ref('<p>hello</p><hr />')
    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }
    const globalProperties = useGlobalProperties()

    //处理编辑器建立
    const handleEditorCreated = (editor: IDomEditor | undefined) => {
      // 记录 editor 实例，重要！
      editorRef.value = editor
    }

    //单击提交按钮
    const submit_click = () => {
      console.log('valueHtml', valueHtml)
    }

    //加载演示数据
    onMounted(async () => {
      var result = await globalProperties.resolve<AxiosInstance>('$axios').get('/data/table.json')
      valueHtml.value = `<pre><code class="language-typescript">${JSON.stringify(result.data.list)}</code></pre>`
    })

    //释放编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor != undefined) {
        editor.destroy()
      }
    })

    return {
      editorRef,
      valueHtml,
      toolbarConfig,
      editorConfig,
      mode: 'default',
      handleEditorCreated,
      submit_click
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  height: 550px;
  width: 100%;
  border: 1px solid #ccc;
}
.boolbar {
  border-bottom: 1px solid #ccc;
}
.editor {
  overflow-y: hidden;
}
</style>
