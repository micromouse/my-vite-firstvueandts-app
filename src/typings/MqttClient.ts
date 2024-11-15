import mqtt from 'mqtt'

/**
 * Mqtt客户端接口
 */
interface IMqttClient {
  Client: mqtt.MqttClient | null
  Connect: (url: string, options: mqtt.IClientOptions) => void
  Subscribe: (topic: string) => void
}

/**
 * Mqtt客户端接口实现
 */
class MqttClient implements IMqttClient {
  Client: mqtt.MqttClient | null = null

  /**
   * 连接到mqtt broker
   * @param url - mqtt broker url
   * @param options - 连接选项
   */
  Connect(url: string, options: mqtt.IClientOptions) {
    if (!this.Client) {
      this.Client = mqtt.connect(url, options)

      //mqtt错误处理
      this.Client.on('error', (error) => {
        console.error(`Error occurred:`, error)
      })

      //处理接收到的消息
      this.Client.on('message', (topic, paylod) => {
        console.log(`收到来自订阅主题[${topic}]的消息[${paylod.toString()}]`)
      })
    }
  }

  /**
   * 订阅
   * @param topic - 订阅主题
   */
  Subscribe(topic: string) {
    this.Client?.subscribe(topic, (err) => {
      if (err) {
        const newError = new Error(`订阅主题[${topic}]时发生异常:${err.message}`)
        newError.stack += `\nCaused by: ${err.stack}`
        throw newError
      }
    })
  }
}

export default new MqttClient()
