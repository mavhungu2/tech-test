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
      <h2 >{{conversed_value}}</h2>
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios'
  
  var currencies = []
  var conversed_value = ''

  axios.get("https://api.exchangeratesapi.io/latest").then(Response => {
    for(var item in Response['data']['rates']){
      currencies.push(item)
    }
  })

  export default {
    data() {
      return {
        form: {
          amount: '',
          currency: null,
        },
        currencies: currencies,
        show: true,
        conversed_value: conversed_value
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        var conversion = "ZAR_"+this.form['currency']
        axios.get("https://free.currconv.com/api/v7/convert?q="+conversion+"&compact=ultra&apiKey=b8722ac32c4333c77884").then(Response=>{
          this.conversed_value =  this.form['amount']+ " "+ this.form['currency'] + " = " + (Response['data'][conversion]*this.form['amount']) +" ZAR"
        })
      },
    }
  }
</script>