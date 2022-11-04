import { AxiosInstance } from 'axios'
import useCurrentInstance from './useCurrentInstance'

/**
 * 使用axios
 * @returns : AxiosInstance实例、
 * @deprecated : 此函数已被弃用
 */
export default function useAxios() {
  const { $axios } = useCurrentInstance().appContext.config.globalProperties
  const axios = <AxiosInstance>$axios

  return {
    axios
  }
}
