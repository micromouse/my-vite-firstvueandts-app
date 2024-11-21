<template>
  <div class="container">
    <el-form label-width="100px" size="default">
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
        <el-input
          type="textarea"
          v-model="publishMessage"
          placeholder="input a new message"
          @keydown.enter="handlePublishMessage"
        ></el-input>
        <el-button type="primary" :disabled="!publishMessage" @click="handlePublishMessage">发布</el-button>
      </el-form-item>
      <el-form-item label="已接收消息">
        <el-scrollbar class="topic-list" max-height="300px">
          <ul>
            <li v-for="(receiveMessage, index) in receivedMessages" :key="index">
              <pre>{{ receiveMessage }}</pre>
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

export default defineComponent({
  setup() {
    const receivedMessages = ref<string[]>([])
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
        globalProperties.resolveMqttClient().Subscribe(newTopic.value, (message) => {
          receivedMessages.value.push(message)
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
        console.log(`已在主题[${topic}]发布消息[${publishMessage.value}]`)
      }
    }

    return {
      Delete,
      receivedMessages,
      topics,
      newTopic,
      publishMessage,
      selectedTopicIndex,
      handleTopicSelect,
      handleAddTopic,
      handleRemoveTopic,
      handlePublishMessage,
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
</style>
