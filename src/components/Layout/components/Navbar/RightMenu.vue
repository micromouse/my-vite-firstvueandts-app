<template>
  <!--切换主题-->
  <el-dropdown trigger="click" size="default" class="dropdowncontainer">
    <div class="avatar-wrapper">
      <svg-icon iconClass="navigator" className="user-avatar" />
      <CaretBottom class="caret-buttom" />
    </div>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="switchTheme('base-theme')">Base-theme</el-dropdown-item>
        <el-dropdown-item @click="switchTheme('dark')">Dark-theme</el-dropdown-item>
        <el-dropdown-item divided @click="switchTheme('china-red')">China-red</el-dropdown-item>
        <el-dropdown-item @click="switchTheme('lighting-theme')">Lighting-theme</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--个人中心-->
  <el-dropdown trigger="click" size="default" class="dropdowncontainer">
    <div class="avatar-wrapper">
      <svg-icon iconClass="user" className="user-avatar" />
      <span class="username">{{ employeeName }}</span>
      <CaretBottom class="caret-buttom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>Home</el-dropdown-item>
        </router-link>
        <a target="_blank" href="https://github.com/jzfai/vue3-admin-ts">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <a target="_blank" href="https://juejin.cn/post/7036302298435289095">
          <el-dropdown-item>Docs</el-dropdown-item>
        </a>
        <el-dropdown-item divided @click="loginOut">login out</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { CaretBottom } from '@element-plus/icons-vue'
import AuthenticationService from '@/infrustructures/utils/AuthenticationService'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    CaretBottom
  },
  setup() {
    const employeeName = ref<string>()
    const authenticationSerivce = new AuthenticationService(window.appConfig?.oidc)
    const route = useRoute()

    //主题切换
    const switchTheme = (theme: string) => {
      document.getElementsByTagName('html')[0].className = theme
    }

    //注销用户
    const loginOut = async () => {
      sessionStorage.setItem('redirectedUri', route.path)
      await authenticationSerivce.logout()
    }

    //在组件内容被渲染到页面之前自动执行的函数，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点
    //获得登陆员工名
    onBeforeMount(() => {
      authenticationSerivce.getUser()?.then((_user) => {
        if (_user?.profile) {
          employeeName.value = decodeURI(_user.profile.Employeename as string)
        }
      })
    })

    //数据
    return {
      employeeName,
      switchTheme,
      loginOut
    }
  }
})
</script>
<style lang="scss" scoped>
.dropdowncontainer {
  margin-left: 5px;
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    color: #ff0000;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }

  .username {
    margin-left: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

.caret-buttom {
  width: 1em;
  height: 1em;
  margin-left: 4px;
}
</style>
