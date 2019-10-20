<template>
  <div class="home">
    <div>
      <router-link to="/logout">Logout</router-link>
      <router-link to="/about">About</router-link>
      <div>
        How much does
        <input
          type="search"
          placeholder="a bowl of maggi"
          :value="product"
          @input="inputProduct"
        />
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

    <router-link to="/view">
      <button>Submit</button>
    </router-link>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  components: {},
  mounted () {
    this.getGeolocation()
  },
  methods: {
    ...mapActions('product', ['getGeolocation', 'updateCity', 'updateProduct']),

    inputCity (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.updateCity(target.value)
    },

    inputProduct (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.updateProduct(target.value)
    }
  },

  computed: {
    ...mapGetters('product', ['position', 'city', 'cities', 'product'])
  }
})
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
input {
  background: #eee;
  border: none;
  height: 40px;
  padding: 0 10px;
}
.button {
  height: 40px;
  padding: 0 20px;
  background: #eee;
  border: 1px solid #ddd;
}
</style>
