<template>
  <el-button class="crop-button" type="primary" size="default">
    选择图片
    <input class="crop-input" type="file" name="image" accept="image/*" @change="dialog?.selectPhoto_click" />
  </el-button>
  <el-button @click="dialog?.uploadAndSave_Click" type="primary" size="default">上传并保存</el-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dialog: {
      type: Object
    }
  }
})
</script>
<style lang="scss" scoped>
.crop-button {
  position: relative;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
