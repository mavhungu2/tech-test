import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: [],
    conversed_value: ""
  },
  mutations: {
    get_currencies (state) {
      axios.get("https://api.exchangeratesapi.io/latest").then(Response => {
        for(var item in Response['data']['rates']){
          state.currencies.push(item)
        }
      })
    },
    convert_value(state, payload){
      axios.get("https://free.currconv.com/api/v7/convert?q="+payload['conversion']+"&compact=ultra&apiKey=b8722ac32c4333c77884").then(Response=>{
          state.conversed_value =  payload['amount']+ " "+ payload['currency'] + " = " + (Response['data'][payload['conversion']]*payload['amount']) +" ZAR"
      })
    }
  }
});
