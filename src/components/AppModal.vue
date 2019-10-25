<template>
  <div class="app-modal">
    <div class="menu">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style lang="scss" scoped>
.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.menu {
  background: rgba(255, 255, 255, 0.9);
  position: absolute;
  bottom: 10px;
  left: 30px;
  right: 30px;
  border-radius: 11px;
  padding: 20px;
  animation: slideUp 0.24s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translate3d(0, 100px, 0) scale(0.95);
  }

  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
}
</style>
