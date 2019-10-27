<template>
  <div>Logging out...</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LOGIN } from '@/models/route'
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
