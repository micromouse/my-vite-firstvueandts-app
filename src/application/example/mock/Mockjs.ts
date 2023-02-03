/* eslint-disable @typescript-eslint/no-explicit-any */
import Mock from 'mockjs'

/**
 * /mocks get请求
 */
Mock.mock('https://localhost:8080/mocks', 'get', (req: any, res: any) => {
  return Mock.mock({
    status: 200,
    req,
    res,
    data: `请求mock数据成功[${new Date().toLocaleString()}]`
  })
})
