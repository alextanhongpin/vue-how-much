<template>
  <div class="about">
    <h1>About</h1>

    <p>How much wants to be the app for you to find the price of an item.</p>
    <p>Version {{ version }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['version'])
  }
})
</script>
