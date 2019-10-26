<template>
  <div>
    <h1>Profile</h1>

    <table>
      <tbody>
        <tr>
          <td>
            Name
          </td>
          <td>{{ username }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ email }}</td>
        </tr>
        <tr>
          <td>Currency</td>
          <td>
            {{ currency }}
            <span class="edited" v-if="currencyEdited">(edited)&nbsp;</span>
            <i class="edit-icon material-icons md-18" @click="toggleModal"
              >edit</i
            >
          </td>
        </tr>
      </tbody>
    </table>

    <app-modal v-if="showModal">
      <menu-item data-currency="MYR" @click="selectMenuItem">MYR</menu-item>
      <menu-item data-currency="SGD" @click="selectMenuItem">SGD</menu-item>
      <menu-item data-currency="USD" @click="selectMenuItem">USD</menu-item>
      <menu-item :close="true" data-currency="none" @click="selectMenuItem"
        >CLOSE</menu-item
      >
    </app-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AppModal from '@/components/AppModal'
import MenuItem from '@/components/MenuItem'

export default Vue.extend({
  components: {
    AppModal,
    MenuItem
  },

  computed: {
    ...mapGetters(['currency', 'username', 'email'])
  },

  data () {
    return {
      showModal: false,
      currencyEdited: false
    }
  },

  mounted () {
    if (!this.currency) {
      this.updateCurrency('MYR')
    }
  },

  methods: {
    ...mapActions(['updateCurrency']),

    selectMenuItem (evt: KeyboardEvent) {
      const target = evt.currentTarget as HTMLElement
      const currency = target.dataset.currency
      switch (currency) {
        case 'MYR':
        case 'SGD':
        case 'USD':
          this.currencyEdited = this.currency !== currency
          this.updateCurrency(currency)
          // TODO: Set currency.
          break
        default:
          break
      }
      this.showModal = false
    },

    toggleModal () {
      this.showModal = !this.showModal
    }
  }
})
</script>
<style lang="scss" scoped>
$dim: 30px;
.edit-icon {
  border: 1px solid #eee;
  height: $dim;
  width: $dim;
  line-height: $dim;
  text-align: center;
  border-radius: 3px;
  color: #999;
  cursor: pointer;
  font-size: 14px;
}
.edit-icon:hover {
  color: var(--cornflower-blue, #333);
}

tr {
  height: 40px;
  line-height: 40px;
}
td:first-child {
  font-weight: bold;
  padding: 0 10px 0 0;
}
.edited {
  color: #999;
}
</style>
