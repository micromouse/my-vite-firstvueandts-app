### 1. 证书：证书我们使用mkcert签发。

#### 1.0 安装Chocolatey
powershell管理员模式安装
``` shell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```
#### 1.1 安装mkcert（使用Chocolatey安装，Chocolatey是Windows上的包管理工具，用Windows做开发的同学尽快安装一下）
``` shell
choco install mkcert
```
#### 1.2 使用mkcert生成根证书
``` shell
mkcert -install
```
#### 1.3 创建目录存放域名证书和私钥
``` shell
D: mkdir ca
cd ca

//生成所需域名对应的本地证书，例如 localhost,127.0.0.1
mkcert localhost 127.0.0.1
//拷贝证书[localhost+1.pem,localhost+1-key.pem]到项目目录下
```

#### 2.4 配置开启 https
``` ts
...
import { defineConfig, loadEnv } from 'vite'
import path, { resolve } from 'path'
import fs from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, './')
  return {
    ...
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
    }
    ...
  }
})
```