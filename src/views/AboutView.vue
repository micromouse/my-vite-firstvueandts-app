<template>
  <div class="about">
    <h2>
      {{ paramsContent }}
      <br />
      {{ id }}
    </h2>
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
import { useAppStore } from '@/infrustructures/store/app'
import { ElButton, ElSwitch, ElDatePicker } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    ElButton,
    ElSwitch,
    ElDatePicker
  },
  props: {
    id: {
      type: String,
      default: '路由没有传入id值'
    },
    paramsContent: {
      type: String,
      default: '路由没有传入消息'
    }
  },
  setup() {
    var selectedTime = ref<Date>()
    console.log('route.params.paramsContent', useRoute().params.paramsContent)
    console.log('route.query.id', useRoute().query.id)
    return {
      appStore: useAppStore(),
      selectedTime
    }
  }
})
</script>
