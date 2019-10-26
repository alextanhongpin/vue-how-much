<template>
  <div
    class="menu-item"
    @click="$emit('click', $event)"
    :class="{ 'is-close': close }"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    close: Boolean
  }
})
</script>
<style lang="scss" scoped>
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
  color: var(--coral-red);
}
</style>
