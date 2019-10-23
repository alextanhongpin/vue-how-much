<template>
  <div>
    <h3>
      <div class="mono">
        {{ price }}
      </div>

      <i class="icon material-icons" title="thumb up" @click="upvote"
        >thumb_up</i
      >
      <i class="icon material-icons" title="thumb down" @click="downvote"
        >thumb_down</i
      >
    </h3>
    <div>{{ upvotes }} upvotes | {{ downvotes }} downvotes</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    price: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    name: { type: String, default: '' },
    hasVoted: { type: Boolean, default: false }
  },
  methods: {
    upvote () {
      this.upvotes += 1
    },
    downvote () {
      this.downvotes += 1
    }
  }
})
</script>
<style lang="scss">
.icon {
  cursor: pointer;
}
</style>
