<template>
  <el-form label-width="70px" size="default">
    <el-form-item label="用户名">
      <el-input v-model="userInfo.name" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="userInfo.address" />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="userInfo.state" placeholder="select">
        <el-option value="成功" label="成功" />
        <el-option value="失败" label="失败" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { IGdialogAdditionProps } from '@/typings/GDialog'
import { ITableItemUserInfo } from '@/typings/examples/table'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    dialogAdditionProps: {
      type: Object as PropType<IGdialogAdditionProps>,
      required: true
    }
  },
  setup(props) {
    const userInfo = ref(<ITableItemUserInfo>props.dialogAdditionProps.userInfo)

    //处理Ok按钮click事件
    const handleOk = () => {
      props.dialogAdditionProps.updateUserInfo(userInfo.value)
      props.dialogAdditionProps.close()
    }

    return {
      userInfo,
      handleOk
    }
  }
})
</script>
