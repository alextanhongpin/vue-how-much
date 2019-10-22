<template>
  <div class="home-page">
    <app-header></app-header>
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
          />
        </router-link>
      </div>
      <br />

      <div>
        cost in
        <input
          type="search"
          placeholder="city"
          :value="city"
          name="city"
          @input="inputCity"
        />?
      </div>
      <br />

      <div v-if="cities.length">
        {{ cities }}
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

    <br />

    <router-link to="/view">
      <button class="button">Find out</button>
    </router-link>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/AppHeader'
import PriceList from '@/components/PriceList'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  components: {
    AppHeader,
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
