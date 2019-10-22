<template>
  <div class="login-page">
    <form v-on:submit.prevent>
      <h1>Login</h1>
      <div>
        <p>
          <label for="email" class="label">Email</label>
        </p>
        <input
          class="input"
          id="email"
          type="email"
          name="email"
          v-model="email"
          required
        />
      </div>
      <br />

      <div>
        <p>
          <label for="password" class="label">Password</label>
        </p>
        <input
          id="password"
          class="input"
          type="password"
          name="password"
          v-model="password"
          autocomplete
          required
        />
      </div>
      <br />

      <button class="button" @click="submit" :disabled="loading">
        Continue
      </button>
      {{ error }}
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  data () {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters(['error', 'loading'])
  },

  methods: {
    ...mapActions(['postLogin']),
    async submit () {
      await this.postLogin(this.email, this.password)
      const redirect = this.$route.query.redirect || '/'
      this.$router.push(redirect)
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';
.login-page {
  padding: 30px;
}

.label {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.input {
  @extend %input;
  max-width: 240px;
  width: 100%;
}

.button {
  @extend %button;
  width: 100%;
  max-width: 240px;
}
</style>
