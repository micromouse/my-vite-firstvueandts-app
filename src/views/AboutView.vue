<template>
  <div>
    <el-card header="路由传参">
      {{ paramsContent }}
      <br />
      {{ id }}
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <span>页面说明</span>
          <el-button size="large" type="danger">I am elbutton</el-button>
        </div>
      </template>
      <p>This is an about page</p>
    </el-card>
    <el-card header="功能">
      <span>切换侧边栏显示</span>
      <el-switch v-model="appStore.settings.showLeftMenu" />
    </el-card>
    <el-card :header="selectedTimeTitle">
      <el-date-picker v-model="selectedTime" type="datetime" placeholder="pick a day" />
    </el-card>
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/infrustructures/store/app'
import { ElButton, ElSwitch, ElDatePicker } from 'element-plus'
import { computed, defineComponent, ref } from 'vue'
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
    const selectedTime = ref(new Date())
    const selectedTimeTitle = computed(() => `日期选择器[${selectedTime.value?.toLocaleString()}]`)
    console.log('route.params.paramsContent', useRoute().params.paramsContent)
    console.log('route.query.id', useRoute().query.id)

    return {
      appStore: useAppStore(),
      selectedTime,
      selectedTimeTitle: selectedTimeTitle
    }
  }
})
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  margin: 15px 0px;
}
.el-card ::v-deep(.el-card__header) {
  background-color: #000 !important;
  color: white;
}
</style>
