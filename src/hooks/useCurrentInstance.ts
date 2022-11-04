import { ComponentInternalInstance, getCurrentInstance } from 'vue'

/**
 * 使用当前实例,未能获得实例抛出异常
 * @returns - 当前实例
 */
export default function useCurrentInstance(): ComponentInternalInstance {
  const instance = getCurrentInstance()
  if (instance == null) {
    throw '未能获得当前实例'
  }

  return instance
}
