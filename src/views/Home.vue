<template>
  <div class="home-page">
    <h1>Home</h1>
    <div>
      <div>
        How much does
        <router-link to="/search">
          <span class="input">{{ keywordOrDefault }}</span>
        </router-link>
        cost? 🤔
      </div>
    </div>

    <div v-if="productPrices.length">
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

const KEYWORDS = ['a bowl of maggi', 'wedding']
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
    ]),

    keywordOrDefault (): string {
      return (
        this.keyword || KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]
      )
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';
.home-page {
  height: 100%;
}

.input {
  @extend %input;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  color: var(--cornflower-blue);
}

.button {
  @extend %button;
}
</style>
