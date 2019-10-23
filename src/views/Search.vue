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

      <button class="button" v-if="hasKeyword" @click="cancel">
        Cancel
      </button>
      <button class="button" v-else>
        <router-link to="/">
          Close
        </router-link>
      </button>
    </div>
    <br />

    <div v-if="products.length">
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
      No results found
      <router-link to="/suggest">Suggest</router-link>
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
    }
  },
  methods: {
    ...mapActions('product', ['updateKeyword', 'updateProduct']),

    cancel () {
      this.updateKeyword('')
    },

    inputKeyword (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.updateKeyword(target.value)
      this.updateProduct(null)
    },

    selectProduct (evt: KeyboardEvent) {
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
<style lang="scss">
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
.product-item {
  height: 40px;
  line-height: 40px;
}
</style>
