<template>
  <div>
    <h2>已登录用户信息</h2>
    <hr />
    <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { User } from 'oidc-client-ts'
import AuthenticationService from '@/utils/AuthenticationService'

export default defineComponent({
  setup() {
    let user = ref<User>()
    const authenticationSerivce = new AuthenticationService(window.appConfig?.oidc)

    //获得登录用户信息
    onBeforeMount(async () => {
      const _user = await authenticationSerivce.getUser()
      if (_user != undefined) {
        user.value = _user
      }
    })

    //数据
    return {
      user
    }
  }
})
</script>
<style lang="scss" scoped>
pre {
  font-size: large;
}
</style>
