<template>
  <div>
    <h2>SvgIcon Demo</h2>
    <hr />
    <p>navigator icon</p>
    <svg-icon iconClass="navigator" className="svgicon" />
    <el-divider contentPosition="left">[/assets/images/svg]下所有svg文件</el-divider>
    <div class="search-box">
      <el-input class="search" size="large" v-model="keywords" clearable placeholder="请输入图标名称"></el-input>
    </div>
    <ul>
      <li class="icon-li" v-for="(file, index) in filteredFiles" :key="index">
        <div class="icon-li-content">
          <svg-icon :iconClass="file" className="filteredsvgicon" />
          <span>{{ file }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ElInput, ElDivider } from 'element-plus'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  components: {
    ElInput,
    ElDivider
  },
  setup() {
    const files = ref<Array<string>>([])
    const keywords = ref('')

    //筛选后文件名
    const filteredFiles = computed(() => {
      return files.value.filter((file) => file.indexOf(keywords.value) !== -1)
    })

    //加载[@/assets/images/svg]下所有svg文件
    onMounted(() => {
      const _files = import.meta.glob('@/assets/images/svg/*.svg')

      //填充文件名
      for (const key in _files) {
        files.value.push(key.replace(/(^.*\/|\.svg)/g, ''))
      }
    })

    return {
      files,
      keywords,
      filteredFiles
    }
  }
})
</script>
<style lang="scss" scoped>
.svgicon {
  margin: 5px 10px;
  color: #ff0000;
  width: 100px;
  height: 100px;
}
.filteredsvgicon {
  margin: 5px;
  width: 32px;
  height: 32px;
}
.search-box {
  text-align: center;
  margin-top: 10px;
}
.search {
  width: 300px;
}
.icon-li {
  display: inline-block;
  padding: 10px;
  width: 120px;
  height: 120px;
}
.icon-li-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-li-content i {
  font-size: 36px;
  color: #606266;
}
.icon-li-content span {
  margin-top: 10px;
  color: #787878;
}
</style>
