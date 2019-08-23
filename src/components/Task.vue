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
          <!-- <option v-for="item in currencies" 
            v-bind:key="item" 
            :value="item">{{item}}
          </option> -->
        </b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios'
  
  var currencies = []

  axios.get("https://api.exchangeratesapi.io/latest").then(Response => {
    console.log(Response['data']['rates'])
    console.log(currencies)
    for(var item in Response['data']['rates']){
      console.log(item)
      currencies.push(item)
    }
    console.log(currencies)
  })

  export default {
    data() {
      return {
        form: {
          amount: '',
          currency: null,
        },
        currencies: currencies,
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
    }
  }
</script>