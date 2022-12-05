import { onMounted, ref } from 'vue'

/**
 * 使用Hook测试
 */
export default function () {
  const ref1 = ref<string>('Hook数据ref1')
  const ref2 = ref<string>('Hook数据ref2')

  //页面加载完成，可以访问DOM了
  onMounted(() => {
    console.log('hooks onmounted')
  })

  //Hook里的方法
  const executeHook = (): string => {
    alert('我是hook里的方法')
    ref1.value += '-1'
    ref2.value += '-1'
    return 'hook方法执行了'
  }

  //返回数据
  return {
    ref1,
    ref2,
    executeHook
  }
}
