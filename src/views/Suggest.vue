<template>
  <div class="suggest-page">
    <router-link :to="backUrl">Back</router-link>

    <form v-on:submit.prevent>
      <div>
        <p>
          <label class="label">Name</label>
        </p>
        <input
          class="input"
          type="text"
          :value="product"
          name="product"
          @input="inputProduct"
          autocomplete
        />
      </div>

      <div>
        <p>
          <label class="label">Amount</label>
        </p>
        <input
          class="input"
          type="number"
          placeholder="Enter your amount"
          :value="amount"
          name="amount"
          @input="inputAmount"
          @change="parseInputAmount"
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

    inputProduct (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.product = target.value
    },

    inputAmount (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.amount = target.value
    },

    parseInputAmount (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.amount = target.value
    },

    submitForm () {
      // const amount = parseFloat(this.amount)
      // TODO: Reset keyword and product.
      // TODO: Create product.
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
  padding: 30px;
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
