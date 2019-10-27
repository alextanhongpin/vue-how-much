<template>
  <div class="suggest-page">
    <h1>Suggest</h1>
    <p>
      <router-link :to="backUrl">← Back</router-link>
    </p>

    <form v-on:submit.prevent>
      <div>
        <p>
          <label for="name" class="label">Name</label>
        </p>
        <input
          id="name"
          class="input"
          type="text"
          v-model="name"
          name="name"
          maxlength="255"
          minlength="3"
          autocomplete
          autofocus
          required
        />
      </div>

      <div>
        <p>
          <label for="price" class="label">Price</label>
        </p>
        <input
          id="price"
          class="input"
          type="number"
          placeholder="Enter your price"
          v-model="price"
          name="price"
          @change="parseInputPrice"
          min="0.01"
          step="0.01"
          max="10000000000000000"
          autocomplete
          required
        />
      </div>
      <br />

      <button @click="submitForm" class="button" :disabled="loading">
        Submit
      </button>
      {{ error }}
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapGetters('product', ['keyword', 'loading', 'error']),

    backUrl () {
      return this.$route.query.redirect || '/'
    }
  },

  mounted () {
    this.name = this.keyword
  },

  data () {
    return {
      price: '',
      name: ''
    }
  },

  methods: {
    ...mapActions('product', ['updateKeyword', 'createProduct']),

    parseInputPrice (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.price = target.value
    },

    async submitForm () {
      this.updateKeyword('')
      const success = await this.createProduct({
        price: parseFloat(this.price),
        name: this.name
      })
      success && this.$router.replace('/thank-you')
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/styles.scss';

.suggest-page {
}

.input {
  @extend %input;
}

.label {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
}

.button {
  @extend %button;
  text-decoration: none;
  width: 100%;
}
</style>
