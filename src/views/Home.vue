<template>
  <div class="home">
    <div>
      <div>
        How much does <input type="text" placeholder="a bowl of maggi" />
      </div>
      <br />

      <div>
        cost in
        <input
          type="search"
          placeholder="city"
          :value="city"
          name="city"
          @input="updateInput"
        />?
      </div>
      <br />

      <div v-if="searchResults.length">
        {{ searchResults }}
      </div>
    </div>

    <router-view></router-view>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Position from '@/types/position'
import { getClosestCity, searchCities } from '@/models/cities'

export default Vue.extend({
  components: {},
  data () {
    return {
      position: {} as Position,
      city: '' as string
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
          this.position = {
            latitude,
            longitude
          }
          const city = getClosestCity(this.position)
          if (city && city.name) {
            this.city = city.name
          }
        })
      } else {
      }
    },

    updateInput (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.city = target.value
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
