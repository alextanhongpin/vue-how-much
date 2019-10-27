<template>
  <form v-on:submit.prevent class="auth-form">
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
        autofocus
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
    <div class="warning-message">
      {{ error }}
    </div>
    <br />

    <button class="button" @click="submit" :disabled="loading">
      Continue
    </button>
    <slot name="footer"></slot>
  </form>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      email: '',
      password: ''
    }
  },

  props: {
    loading: Boolean,
    error: String
  },

  methods: {
    async submit () {
      this.$emit('submit', {
        email: this.email,
        password: this.password
      })
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';
$max-width: 280px;

.auth-form {
  margin: auto;
  max-width: $max-width;
}

.label {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.input {
  @extend %input;
  max-width: $max-width;
  width: 100%;
}

.button {
  @extend %button;
  width: 100%;
  max-width: $max-width;
}
.warning-message {
  min-height: 40px;
  line-height: 1.5rem;
  font-size: 14px;
  color: var(--coral-red);
}
</style>
