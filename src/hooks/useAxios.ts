import { AxiosInstance } from 'axios'
import useCurrentInstance from './useCurrentInstance'

/**
 * 使用axios
 * @returns : AxiosInstance实例、
 * @deprecated : 此函数已被弃用,使用一下代码代替
 * <script lang="ts">
 * import { defineComponent, ref } from 'vue'
 * import { AxiosInstance } from 'axios'
 * import useGlobalProperties from '@/hooks/useGlobalProperties'
 *
 * export default defineComponent({
 *  ...
 *  setup() {
 *    const globalProperties = useGlobalProperties()
 *
 *    //使用axios获得数据
 *    const getData = () => {
 *      globalProperties
 *        .resolve<AxiosInstance>('$axios')({
 *          url: '/url',
 *          method: 'get'
 *        })
 *        .then((res) => {
 *          console.log('res', res)
 *        })
 *    }
 *    ...
 *  }
 * })
 * </script>
 */
export default function useAxios() {
  const { $axios } = useCurrentInstance().appContext.config.globalProperties
  const axios = <AxiosInstance>$axios

  return {
    axios
  }
}
