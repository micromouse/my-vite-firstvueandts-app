import mqtt from 'mqtt'

/**
 * Mqtt客户端接口
 */
export interface IMqttClient {
  Client: mqtt.MqttClient | null
  Connect: (url: string, options: mqtt.IClientOptions) => void
  Subscribe: (topic: string) => void
}

/**
 * Mqtt客户端接口实现
 */
class MqttClient implements IMqttClient {
  private _url: string
  private _options: mqtt.IClientOptions

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
  }

  /**
   * 连接到mqtt broker
   */
  Connect() {
    if (!this.Client) {
      this.Client = mqtt.connect(this._url, this._options)

      //成功连接
      this.Client.on('connect', () => console.log(`Successfully connected to the MQTT broker.`))

      //mqtt错误处理
      this.Client.on('error', (error) => {
        console.error(`Error occurred:`, error)
        this.Client?.end()
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
  public Subscribe(topic: string) {
    this.GetMqttClient()?.subscribe(topic, (err) => {
      if (err) {
        const newError = new Error(`订阅主题[${topic}]时发生异常:${err.message}`)
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
}

/**
 * 默认导出依据参数创建mqtt.MqttClient的函数
 * @param url - mqtt broker url
 * @param options - 选项
 * @returns - mqtt.MqttClient
 */
export default function createMqttClient(url: string, options: mqtt.IClientOptions) {
  return new MqttClient(url, options)
}
