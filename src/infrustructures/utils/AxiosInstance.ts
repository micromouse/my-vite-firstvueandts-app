import axios from 'axios'

//初始化axios
const instance = axios.create({
  baseURL: `${process.env.VITE_API_DOMAIN}`,
  timeout: 200
})

export default instance
