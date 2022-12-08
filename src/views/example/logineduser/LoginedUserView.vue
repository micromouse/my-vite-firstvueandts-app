<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template v-slot:header>
            <div class="clearfix">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">
            <div class="info-image">
              <el-avatar :src="profilePhoto" :size="100" />
              <el-link class="info-edit" :icon="CameraFilled" @click="updateProfilePhoto_click" />
            </div>
            <div class="info-name">{{ user?.profile.name }}</div>
            <div class="info-desc">不可能！我的代码怎么可能会有bug！</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>已登录用户信息</span>
            </div>
          </template>
          <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { CameraFilled } from '@element-plus/icons-vue'
import { User } from 'oidc-client-ts'
import useGlobalProperties from '@/infrustructures/hooks/useGlobalProperties'
import AuthenticationService from '@/infrustructures/utils/AuthenticationService'
import UpdateProfilePhotoView from './UpdateProfilePhotoView.vue'
import ProfilePhotoButtons from './ProfilePhotoButtons.vue'

export default defineComponent({
  setup() {
    const user = ref<User>()
    const profilePhoto = ref(new URL('/src/assets/logo.png', import.meta.url).href)
    const globalProperties = useGlobalProperties()
    const authenticationSerivce = new AuthenticationService(window.appConfig?.oidc)

    //更新头像
    const updateProfilePhoto_click = () => {
      globalProperties.resolveGDialog().show(UpdateProfilePhotoView, {
        title: '更新头像',
        width: 800,
        footer: {
          showCancel: false,
          buttons: ProfilePhotoButtons
        },
        additions: {
          profilePhoto: profilePhoto.value,
          setCroppedImage: (image: string) => (profilePhoto.value = image)
        }
      })
    }

    //获得登录用户信息
    onBeforeMount(async () => {
      const _user = await authenticationSerivce.getUser()
      if (_user != undefined) {
        user.value = _user
      }
    })

    //数据
    return {
      user,
      CameraFilled,
      profilePhoto,
      updateProfilePhoto_click
    }
  }
})
</script>
<style lang="scss" scoped>
pre {
  font-size: large;
}
.info {
  text-align: center;
  padding: 35px 0;
}
.info-image {
  position: relative;
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}
.info-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 25px;
  color: #eee;
}
.info-image:hover .info-edit {
  opacity: 1;
}
.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}
.info-desc {
  margin: 15px 0px 10px;
  font-size: 20px;
  color: #262626;
}
</style>
