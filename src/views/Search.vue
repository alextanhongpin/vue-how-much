<template>
  <div class="search-page">
    <div class="search">
      <input
        type="text"
        placeholder="Enter item name, e.g. iphone"
        class="input"
        autocomplete
        :value="keyword"
        @input="inputKeyword"
      />

      <button class="button" v-if="hasKeyword" @click="clear">
        Clear
      </button>
      <button class="button" v-else>
        <router-link to="/">
          Close
        </router-link>
      </button>
    </div>
    <br />

    <div v-if="!showSuggest">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
        :data-id="product.id"
        @click="selectProduct"
      >
        {{ product.name }}
      </div>
    </div>
    <div v-else>
      No results found.
      <router-link :to="suggestUrl">Suggest.</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('product', ['keyword', 'products', 'productWithId']),

    hasKeyword () {
      return this.keyword.length > 0
    },

    showSuggest () {
      return this.hasKeyword && !this.products.length
    },

    suggestUrl () {
      return `/suggest?redirect=${this.$route.path}`
    }
  },

  methods: {
    ...mapActions('product', ['updateKeyword', 'updateProduct']),

    clear () {
      this.updateKeyword('')
      this.updateProduct(null)
    },

    inputKeyword (evt: KeyboardEvent) {
      this.startSearching = true
      const target = evt.currentTarget as HTMLInputElement
      this.updateKeyword(target.value)
      this.updateProduct(null)
    },

    selectProduct (evt: KeyboardEvent) {
      this.startSearching = false
      const target = evt.currentTarget as HTMLInputElement
      const id = parseInt(target.dataset.id, 10)
      const product = this.productWithId(id)
      if (product) {
        this.updateProduct(product)
        this.updateKeyword(product.name)
      }
      this.$router.push('/')
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';
.search-page {
  padding: 30px;
}

.search {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-column-gap: 10px;
}

.input {
  @extend %input;
  width: 100%;
}

.button {
  @extend %button;
  background: white;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}

.product-item:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.product-item {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  padding: 0 5px;
  border-radius: 3px;
}

.product-item:hover {
  background: #f7f7f7;
}
</style>
