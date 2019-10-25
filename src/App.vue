<template>
  <div id="app">
    <main class="main">
      <app-header @click="toggleModal"></app-header>
      <router-view />
    </main>
    <app-modal v-if="showModal">
      <div class="menu-item" data-name="logout" @click="selectMenuItem">
        Logout
      </div>
      <div class="menu-item" data-name="about" @click="selectMenuItem">
        About
      </div>
      <div
        class="menu-item is-close"
        data-name="dismiss"
        @click="selectMenuItem"
      >
        Close
      </div>
    </app-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/AppHeader'
import AppModal from '@/components/AppModal'

export default Vue.extend({
  components: {
    AppHeader,
    AppModal
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

.menu-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.menu-item:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.menu-item:hover {
  background: #eee;
}
.is-close {
  color: #ff4444;
}
</style>
