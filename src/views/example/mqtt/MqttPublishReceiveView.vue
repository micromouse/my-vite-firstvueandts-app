<template>
  <div>
    <el-form label-width="100px" size="default" class="container">
      <el-form-item label="订阅主题">
        <el-input v-model="newTopic" placeholder="input a new topic" @keydown.enter.prevent="handleAddTopic">
          <template #append>
            <el-button type="primary" :disabled="!newTopic" @click="handleAddTopic">订阅</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="已有主题">
        <el-scrollbar max-height="150px" class="topic-list">
          <ul>
            <li
              v-for="(topic, index) in topics"
              :key="index"
              :class="{ selected: selectedTopicIndex == index }"
              @click="handleTopicSelect(index)"
            >
              <span>{{ topic }}</span>
              <el-button type="danger" :icon="Delete" size="small" @click="handleRemoveTopic(index)">删除</el-button>
            </li>
          </ul>
        </el-scrollbar>
      </el-form-item>
      <el-form-item label="发布主题消息">
        <el-input type="textarea" v-model="publishMessage" placeholder="input a new message"></el-input>
        <el-button type="primary" :disabled="!publishMessage" @click="handlePublishMessage">发布</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="已接收消息">
        <el-scrollbar class="message-list" max-height="500px">
          <ul>
            <li v-for="(message, index) in messages" :key="index" :class="getMessageClass(message)">
              <div class="message-content">
                <pre>{{ JSON.stringify(message, null, 2) }}</pre>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'
import { Delete } from '@element-plus/icons-vue'

/**
 * 消息信息接口
 */
interface IMessage {
  type: 'received' | 'published'
  topic: string
  message: any
  createTime: Date
}

export default defineComponent({
  setup() {
    const messages = ref<IMessage[]>([])
    const topics = ref<string[]>([])
    const newTopic = ref<string>('')
    const publishMessage = ref<string>('')
    const selectedTopicIndex = ref<number | null>(null)
    const globalProperties = useGlobalProperties()

    /**
     * 处理主题选择
     * @param index - 主题索引
     */
    const handleTopicSelect = (index: number) => {
      selectedTopicIndex.value = index
    }

    /**
     * 处理新增主题
     * @param value - 主题
     */
    const handleAddTopic = (evt: Event | KeyboardEvent) => {
      //用户输入了值但值不在已有主题列表中，新增主题
      if (newTopic.value && !topics.value.includes(newTopic.value)) {
        //订阅主题
        globalProperties.resolveMqttClient().Subscribe(newTopic.value, (topic, message) => {
          messages.value.push({
            type: 'received',
            topic: topic,
            message: message.toTryJSON(),
            createTime: new Date()
          })
        })

        //添加新主题的主题集合中
        topics.value.push(newTopic.value)
        newTopic.value = ''
      }
    }

    /**
     * 删除当前主题
     * @param topic - 当前主题
     */
    const handleRemoveTopic = (index: number) => {
      if (index != -1) {
        topics.value.splice(index, 1)
      }
    }

    /**
     * 发布主题消息
     */
    const handlePublishMessage = () => {
      if (publishMessage.value && selectedTopicIndex.value != null) {
        const topic = topics.value[selectedTopicIndex.value]
        globalProperties.resolveMqttClient().Publish(topic, publishMessage.value)

        //保存已发送消息
        messages.value.push({
          type: 'published',
          topic: topic,
          message: publishMessage.value,
          createTime: new Date()
        })
        publishMessage.value = ''
      }
    }

    /**
     * 获得当前消息显示样式
     * @param message - 消息
     */
    const getMessageClass = (message: IMessage) => {
      return message.type === 'published' ? 'message-right' : 'message-left'
    }

    return {
      Delete,
      messages,
      topics,
      newTopic,
      publishMessage,
      selectedTopicIndex,
      handleTopicSelect,
      handleAddTopic,
      handleRemoveTopic,
      handlePublishMessage,
      getMessageClass,
      globalProperties
    }
  }
})
</script>
<style scoped>
.container {
  width: 500px;
}

.topic-list {
  width: 100%;
}

.topic-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  border: 1px solid #e0e0e0;
}

.topic-list ul li {
  padding: 8px;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
}

.topic-list li button {
  margin-left: auto;
}

.topic-list li.selected {
  background-color: #f0f8ff;
}

.message-list {
  width: 800px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.message-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-list ul li {
  display: flex;
  margin-bottom: 10px;
}

.message-left {
  justify-content: flex-start;
  text-align: left;
}

.message-right {
  justify-content: flex-end;
}

.message-content {
  display: inline-block;
  max-width: 60%;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace; /* 使用等宽字体来显示JSON */
  white-space: pre-wrap; /* 保留空格和换行 */
  word-wrap: break-word; /* 长单词自动换行 */
}

.message-left .message-content {
  background-color: #f0f0f0; /* 灰色背景用于接收的消息 */
  color: #333;
}

.message-right .message-content {
  background-color: #8ed081; /* 绿色背景用于发布的消息 */
  color: #fff;
}
</style>
