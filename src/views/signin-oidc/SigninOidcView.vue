<template>
  <h2>signin-oidc loading...</h2>
</template>
<script lang="ts">
import AuthenticationService from '@/infrustructures/utils/AuthenticationService'
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User } from 'oidc-client-ts'
import CustomError from '@/typings/CustomError'

export default defineComponent({
  setup() {
    const router = useRouter()

    onMounted(async () => {
      let user: User | void

      try {
        const authenticationService = new AuthenticationService(window.appConfig.oidc)
        user = await authenticationService.signinRedirectCallback()
        router.replace({ path: sessionStorage.getItem('redirectedUri') ?? '/' })
        sessionStorage.removeItem('redirectedUri')
      } catch (e) {
        throw new CustomError({ message: 'signinRedirectCallback failure:', innerError: e, data: { user: user } })
      }
    })
  }
})
</script>
