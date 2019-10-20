<template>
  <div>Logging out...</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LOGIN } from '@/models/routes'
import { mapActions } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapActions(['logout'])
  },

  mounted () {
    this.logout()
    this.$router.replace(LOGIN)
  }
})
</script>
