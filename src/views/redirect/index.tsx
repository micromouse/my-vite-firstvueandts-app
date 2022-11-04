import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    //挂载之前
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router.replace({ path: `/${path}`, query: query })
    })

    return () => <div>Loading...</div>
  }
})
