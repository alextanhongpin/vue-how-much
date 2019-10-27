<template>
  <div class="suggest-page">
    <h1>Suggest</h1>
    <p>
      <router-link :to="backUrl">← Back</router-link>
    </p>

    <form v-on:submit.prevent>
      <div>
        <p>
          <label for="product" class="label">Name</label>
        </p>
        <input
          id="product"
          class="input"
          type="text"
          v-model="product"
          name="product"
          maxlength="255"
          minlength="3"
          autocomplete
          autofocus
          required
        />
      </div>

      <div>
        <p>
          <label for="amount" class="label">Amount</label>
        </p>
        <input
          id="amount"
          class="input"
          type="number"
          placeholder="Enter your amount"
          v-model="amount"
          name="amount"
          @change="parseInputAmount"
          min="0.01"
          max="10000000000000000"
          autocomplete
          required
        />
      </div>
      <br />

      <button @click="submitForm" class="button">
        Submit
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapGetters('product', ['keyword']),

    backUrl () {
      return this.$route.query.redirect || '/'
    }
  },

  mounted () {
    this.product = this.keyword
  },

  data () {
    return {
      amount: '',
      product: ''
    }
  },

  methods: {
    ...mapActions('product', ['updateKeyword', 'updateProduct']),

    parseInputAmount (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.amount = target.value
    },

    submitForm () {
      // const amount = parseFloat(this.amount)
      // TODO: Reset keyword and product.
      // TODO: Create product.
      console.log(this.amount, this.product)
      this.updateKeyword('')
      this.updateProduct(null)
      this.$router.replace('/thank-you')
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
