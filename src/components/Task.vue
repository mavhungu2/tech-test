<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">

      <b-form-group id="input-group-2" label="Enter Amount:" label-for="input-2">
        <b-form-input 
          pattern="^\d*(\.\d{0,2})?$"
          title="Number Should Contain Two Decimal Places"
          type="number" 
          min="0.00" 
          step="0.01"
          value="0.00"
          id="amount_input"
          v-model="form.amount"
          required
          placeholder="Enter Amount"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Currency:" label-for="input-3">
        <b-form-select v-model="form.currency" :options="currencies" id="currencies" required>
          <template slot="first">
            <option :value="null" disabled>-- Please select a currency --</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <h2 >{{conversed_value}}</h2>
    </b-form>
  </div>
</template>

<script>
  import store from '../store'

  store.dispatch('get_currencies')

  export default {
    data() {
      return {
        form: {
          amount: '',
          currency: null,
        },
        currencies: this.$store.state.currencies,
        show: true,
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        var conversion = "ZAR_"+this.form['currency']
        store.dispatch("convert_value", {"amount": this.form['amount'], "currency": this.form['currency'],"conversion": conversion})
      },
    },
    computed: {
      conversed_value () {
        return this.$store.state.conversed_value
      }
    }
  }
</script>