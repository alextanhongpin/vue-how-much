<template>
  <div class="home">
    <div>
      How much does <input type="text" placeholder="a bowl of maggi" /> cost in
      <input
        type="search"
        placeholder="city"
        :value="city"
        name="city"
        @input="updateInput"
      />?
      <div v-if="searchResults.length">
        {{ searchResults }}
      </div>
    </div>
    <div>
      <label>Enter your amount:</label>
      <input
        class="amount-input"
        type="number"
        placeholder="Enter your amount"
        :value="amount"
        name="amount"
        @input="updateInput"
        @change="parseInputNumber"
      />
    </div>
    <button @click="submitForm" class="button">
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getClosestCity, searchCities } from '@/models/cities'

export default Vue.extend({
  components: {},
  data () {
    return {
      position: {} as Position,
      city: '' as String,
      amount: 0.0
    }
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    getGeolocation () {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords
          this.position.latitude = latitude
          this.position.longitude = longitude
          const city = getClosestCity(this.position)
          if (city && city.name) {
            this.city = city.name
          }
        })
      } else {
      }
    },

    updateInput (evt) {
      const name = evt.currentTarget.name
      this[name] = evt.currentTarget.value
    },

    parseInputNumber (evt) {
      const name = evt.currentTarget.name
      this[name] = parseFloat(evt.currentTarget.value, 10)
    },

    submitForm () {
      const city = this.city
      const amount = parseFloat(this.amount, 10)
      console.log({ city, amount })
    }
  },
  computed: {
    searchResults (): String[] {
      if (this.city.length < 3) {
        return []
      }
      return searchCities(this.city)
    }
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
