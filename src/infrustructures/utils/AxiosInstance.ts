import axios from 'axios'

//初始化axios
const instance = axios.create({
  baseURL: 'https://localhost:8081',
  timeout: 200
})

export default instance
