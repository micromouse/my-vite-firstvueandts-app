import { createApp } from 'vue'
import App from './App.vue'
import startup from './components/Startup/index'
import useConfigReader from './components/Startup/useConfigReader'

//读配置文件
useConfigReader().then((appConfig) => {
  window.appConfig = appConfig
  createApp(App).use(startup).mount('#app')
})
