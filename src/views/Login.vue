<template>
  <div class="login-page">
    <h1>Login</h1>
    <auth-form @submit="submit" :error="error" :loading="loading">
      <template v-slot:footer>
        <p class="footer">
          Don't have an account?
          <router-link to="/register">Register an account.</router-link>
        </p>
      </template>
    </auth-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AuthForm from '@/components/AuthForm'
export default Vue.extend({
  components: {
    AuthForm
  },

  computed: {
    ...mapGetters(['error', 'loading'])
  },

  methods: {
    ...mapActions(['postLogin']),
    async submit ({ email, password }) {
      await this.postLogin({
        email,
        password
      })
      const redirect = this.$route.query.redirect || '/'
      this.$router.push(redirect)
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';
$max-width: 280px;
.login-page {
}

.button {
  @extend %button;
  width: 100%;
  max-width: $max-width;
}

.footer {
  font-size: 14px;
  min-height: 40px;
}
</style>
