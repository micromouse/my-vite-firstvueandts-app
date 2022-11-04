<template>
  <div>
    <h2>Hook Demo</h2>
    <hr />
    <div>
      ref1:{{ ref1 }},
      <br />
      ref2:{{ ref2 }},
      <br />
      hook方法执行结果:{{ executeHookResult }}
    </div>
    <el-button v-on:click="invokeExecuteHook" size="default">执行Hook方法</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import useHookTest from '@/hooks/useHookTest'

export default defineComponent({
  components: {
    ElButton
  },
  setup() {
    const executeHookResult = ref<string>()
    const { ref1, ref2, executeHook } = useHookTest()

    const invokeExecuteHook = () => {
      executeHookResult.value = executeHook()
    }

    return {
      ref1,
      ref2,
      executeHookResult,
      invokeExecuteHook
    }
  }
})
</script>
