<template>
  <div class="price-list">
    <br />
    <div class="mono price-list-name">{{ currency }}{{ price }}</div>
    <div class="action-bar">
      <div>
        <b>{{ downvotes }}</b> downvotes | <b>{{ upvotes }}</b> upvotes
      </div>
      <div class="vote-icons">
        <i
          class="icon material-icons md-18"
          :class="{ selected: hasDownvote }"
          title="thumb down"
          @click="downvote"
          >thumb_down</i
        >
        <i
          class="icon material-icons md-18"
          :class="{ selected: hasUpvote }"
          title="thumb up"
          @click="upvote"
          >thumb_up</i
        >
      </div>
    </div>
    <br />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: { type: String, default: '' },
    price: { type: Number, default: 0 },
    currency: { type: String, default: '' },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    name: { type: String, default: '' },
    hasUpvote: { type: Boolean, default: false },
    hasDownvote: { type: Boolean, default: false }
  },

  methods: {
    upvote () {
      const vote = this.hasUpvote ? 0 : 1
      this.$emit('vote', {
        productPriceId: this.id,
        vote
      })
    },

    downvote () {
      const vote = this.hasDownvote ? 0 : -1
      this.$emit('vote', {
        productPriceId: this.id,
        vote
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.price-list:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.icon {
  cursor: pointer;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 3px;
}
.icon.selected,
.icon:active,
.icon:hover {
  color: #4488ff;
}

.action-bar {
  color: #999;
  display: flex;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.vote-icons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}

.price-list-name {
  font-size: 24px;
  font-weight: bold;
}
</style>
