<template>
  <div class="home-page">
    <div>
      <router-link to="/logout">Logout</router-link>
      <router-link to="/about">About</router-link>

      <div>
        How much does
        <router-link to="/search">
          <input
            type="search"
            placeholder="a bowl of maggi"
            :value="keyword"
            readonly
            disabled="true"
          />
        </router-link>
        cost?
      </div>
    </div>

    <div>
      <h1>
        Results
      </h1>

      <price-list
        v-bind="product"
        v-for="product in productPrices"
        :key="product.id"
      ></price-list>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PriceList from '@/components/PriceList'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  components: {
    PriceList
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    ...mapActions('product', ['getGeolocation', 'updateCity', 'updateProduct']),

    inputCity (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.updateCity(target.value)
    }
  },

  computed: {
    ...mapGetters('product', [
      'position',
      'city',
      'cities',
      'product',
      'keyword',
      'productPrices'
    ])
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';
.home-page {
  height: 100%;
  padding: 30px;
}

input {
  @extend %input;
}

.button {
  @extend %button;
}
</style>
