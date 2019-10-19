<template>
  <div>
    <router-link to="/">Back</router-link>

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
      <router-link to="/thank-you">
        Submit
      </router-link>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      amount: ''
    }
  },

  methods: {
    updateInput (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.amount = target.value
    },

    parseInputNumber (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLInputElement
      this.amount = target.value
    },

    submitForm () {
      const amount = parseFloat(this.amount)
      console.log(amount)
    }
  }
})
</script>
