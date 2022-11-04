<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button>I am elbutton</el-button>
    <hr />
    <span>切换侧边栏显示</span>
    <el-switch v-model="appStore.settings.showLeftMenu" />
    <hr />
    <span>日期选择器[{{ selectedTime?.toLocaleString() }}]</span>
    <br />
    <el-date-picker v-model="selectedTime" type="datetime" placeholder="pick a day" />
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/store/app'
import { ElButton, ElSwitch, ElDatePicker } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    ElButton,
    ElSwitch,
    ElDatePicker
  },
  setup() {
    var selectedTime = ref<Date>()

    return {
      appStore: useAppStore(),
      selectedTime
    }
  }
})
</script>
