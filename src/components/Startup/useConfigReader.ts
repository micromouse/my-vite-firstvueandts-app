import { ISystemSetting } from '@/typings/common'
/**
 * 读取配置文件
 * @param file - 配置文件
 * @param throwError - 读取失败是否抛出异常(默认抛出异常)
 * @returns - 配置对象,读取错误返回相应状态码和文本
 */
async function readConfiguration<T>(file: string, throwError = true): Promise<T | null> {
  let data = <T>null
  const response = await fetch(file, { method: 'get' })
  if (response.ok) {
    data = <T>await response.json()
  } else if (!response.ok && throwError) {
    throw `read configuration [] response error:[${response.status}:${response.statusText}]`
  }

  return data
}

/**
 * 使用应用程序配置读取器
 * @returns - 应用程序配置信息
 */
export default async function useConfigReader(): Promise<IAppConfiguration> {
  //读环境变量有两种方式[process.env.VITE_BASE_URL/import.meta.env.BASE_URL]
  const settings = await readConfiguration<ISystemSetting>(`${process.env.VITE_BASE_URL}config/settings.json`)
  const oidc = await readConfiguration<IOidc>(`${import.meta.env.BASE_URL}config/oidc.json`, settings?.isNeedLogin)

  return {
    oidc: oidc,
    settings: settings
  }
}
