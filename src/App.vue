<template>
  <div id="app">
    <main class="main">
      <app-header @click="goToProfile" @settings="toggleModal"></app-header>
      <router-view />
    </main>
    <app-modal v-if="showModal">
      <menu-item data-name="logout" @click="selectMenuItem">Logout</menu-item>
      <menu-item data-name="about" @click="selectMenuItem">About</menu-item>
      <menu-item :close="true" data-name="dismiss" @click="selectMenuItem"
        >Close</menu-item
      >
    </app-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/AppHeader'
import AppModal from '@/components/AppModal'
import MenuItem from '@/components/MenuItem'

export default Vue.extend({
  components: {
    AppHeader,
    AppModal,
    MenuItem
  },

  data () {
    return {
      showModal: false
    }
  },

  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    },

    selectMenuItem (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLElement
      const name = target.dataset.name
      switch (name) {
        case 'logout':
        case 'about':
          this.$router.push('/' + name)
          break
        default:
          console.log('not supported', target.name)
      }
      this.toggleModal()
    },

    goToProfile () {
      this.$router.push('/profile')
    }
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

@media (max-width: 640px) {
  .main {
    padding: 10px;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
