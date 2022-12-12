<template>
  <div class="container">
    <div class="plugins-tips">
      wangEditor：轻量级 web 富文本编辑器，配置方便，使用简单。 访问地址：
      <a href="https://www.wangeditor.com/doc/" target="_blank">wangEditor</a>
    </div>
    <div class="mgb20" ref="editorRef"></div>
    <el-button type="primary" size="default" v-on:click="syncHtml">提交</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import wangEditor from 'wangeditor'

export default defineComponent({
  setup() {
    const editorRef = ref(null)
    const content = reactive({ html: '', text: '' })
    let instance: wangEditor | null

    //加载编辑器
    onMounted(() => {
      instance = new wangEditor(editorRef.value)
      instance.config.zIndex = 1
      instance.create()
    })

    //释放编辑器
    onBeforeUnmount(() => {
      if (instance != null) {
        instance.destroy()
        instance = null
      }
    })

    const syncHtml = () => {
      content.html = <string>instance?.txt.html()
      console.log('content.html', content.html)
    }

    return {
      editorRef,
      syncHtml
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.plugins-tips {
  padding: 20px 10px;
  margin-bottom: 20px;
}
</style>
