import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import eslintPlugin from 'vite-plugin-eslint'
import path, { resolve } from 'path'
import fs from 'fs'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, './')
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue']
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/images/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        path: 'path-browserify'
      }
    },
    build: {
      target: 'ESNext'
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'ESNext'
      }
    },
    server: {
      host: envConfig.VITE_HOST,
      port: parseInt(envConfig.VITE_PORT),
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: {
        cert: fs.readFileSync(path.join(__dirname, 'public/ca/localhost+1.pem')),
        key: fs.readFileSync(path.join(__dirname, 'public/ca/localhost+1-key.pem'))
      },
      // 服务端渲染
      ssr: false,
      base: envConfig.VITE_BASE_URL,
      outDir: envConfig.VITE_OUTPUT_DIR
    },
    define: {
      'process.env': { ...envConfig }
    }
  }
})
