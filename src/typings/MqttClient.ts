import mqtt from 'mqtt'

/**
 * Mqtt客户端接口
 */
export interface IMqttClient {
  onConnected?: () => void
  onSubscribed?: (topic: string) => void

  Client: mqtt.MqttClient | null
  Connect: (url: string, options: mqtt.IClientOptions) => void
  Subscribe: (topic: string, handler: (message: string) => void) => void
  Publish: (topic: string, message: string) => void
}

/**
 * Mqtt客户端接口实现
 */
class MqttClient implements IMqttClient {
  private _url: string
  private _options: mqtt.IClientOptions
  private _handlers: Map<string, (message: string) => void>

  /**
   * 已连接到qtt broker事件
   */
  onConnected?: () => void

  /**
   * 已订阅主题事件
   */
  onSubscribed?: (topic: string) => void

  /**
   * mqtt.MqttClient
   */
  Client: mqtt.MqttClient | null = null

  /**
   * 初始Mqtt客户端接口实现
   * @param url - mqtt broker
   * @param options - 选项
   */
  constructor(url: string, options: mqtt.IClientOptions) {
    this._url = url
    this._options = options
    this._handlers = new Map()
  }

  /**
   * 连接到mqtt broker
   */
  Connect() {
    if (!this.Client) {
      this.Client = mqtt.connect(this._url, this._options)

      //成功连接
      this.Client.on('connect', () => this.onConnected?.())

      //mqtt错误处理
      this.Client.on('error', (error) => {
        console.error(`Error occurred:`, error)
        this.Client?.end()
      })

      //处理接收到的消息
      this.Client.on('message', (topic, paylod) => {
        const handler = this._handlers.get(topic)
        if (handler) {
          let message = paylod.toString()
          try {
            message = JSON.stringify(JSON.parse(message), null, 2)
          } catch {
            //不是json格式消息，原文输出
            message = this.GetUnicodeToChinese(paylod.toString())
          }
          handler(message)
        } else {
          throw new Error(`No Handler registered for topic[${topic}],message:[${paylod.toString()}]`)
        }
      })
    }
  }

  /**
   * 订阅
   * @param topic - 订阅主题
   */
  Subscribe(topic: string, handler: (message: string) => void) {
    this.GetMqttClient()?.subscribe(topic, (err) => {
      if (err) {
        const newError = new Error(`订阅主题[${topic}]时发生异常:${err.message}`)
        newError.stack += `\nCaused by: ${err.stack}`
        throw newError
      }

      this.onSubscribed?.(topic)
      this._handlers.set(topic, handler)
    })
  }

  /**
   * 发布消息到主题
   * @param topic - 主题
   * @param message - 消息
   */
  Publish(topic: string, message: string) {
    this.GetMqttClient()?.publish(topic, message, (err) => {
      if (err) {
        const newError = new Error(`发布主题[${topic}]消息[${message}]时发生异常:${err.message}`)
        newError.stack += `\nCaused by: ${err.stack}`
        throw newError
      }
    })
  }

  /**
   * mqtt客户端无效时自动连接到mqtt broker
   * @returns - mqtt.MqttClient
   */
  private GetMqttClient(): mqtt.MqttClient | null {
    if (!this.Client) {
      this.Connect()
    }

    return this.Client
  }

  private GetUnicodeToChinese(message: string) {
    return message.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace('\\u', ''), 16))
    })
  }
}

/**
 * 默认导出依据参数创建mqtt.MqttClient的函数
 * @param url - mqtt broker url
 * @param options - 选项
 * @returns - mqtt.MqttClient
 */
export default function createMqttClient(url: string, options: mqtt.IClientOptions) {
  const mqttClient = new MqttClient(url, options)

  mqttClient.onConnected = () => console.log('connected to mqtt broker')
  mqttClient.onSubscribed = (topic) => console.log(`subscribed to topic: ${topic}`)

  return mqttClient
}
