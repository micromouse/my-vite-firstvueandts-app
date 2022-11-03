import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import useConfigReader from './components/Startup/useConfigReader'

//读配置文件
useConfigReader().then((appConfig) => {
  window.appConfig = appConfig
  createApp(App).mount('#app')
})
