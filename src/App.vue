<template>
  <div id="app">
    <main class="main">
      <app-header></app-header>
      <router-view />
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/AppHeader'

export default Vue.extend({
  components: {
    AppHeader
  }
})
</script>

<style lang="scss">
@import '@/styles.scss';
#app {
  min-height: 100vh;
}

.mono {
  font-family: 'B612 Mono', monospace;
}

#app,
input,
button,
textarea {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: 'B612', sans-serif;
}
.main {
  margin: auto;
  max-width: 800px;
  width: 100%;
  padding: 30px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
