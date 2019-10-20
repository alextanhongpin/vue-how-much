<template>
  <form v-on:submit.prevent>
    <h1>Login</h1>
    <div>
      <p>
        <label for="email">Email</label>
      </p>
      <input id="email" type="email" name="email" v-model="email" required />
    </div>
    <br />

    <div>
      <p>
        <label for="password">Password</label>
      </p>
      <input
        id="password"
        type="password"
        name="password"
        v-model="password"
        autocomplete
        required
      />
    </div>
    <br />

    <button @click="submit" :disabled="loading">Continue</button>
    {{ error }}
  </form>
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
