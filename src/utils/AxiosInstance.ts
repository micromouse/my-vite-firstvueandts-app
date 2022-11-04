import axios from 'axios'

//初始化axios
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 200
})

export default instance
