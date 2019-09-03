import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

// Update currency values in the api
axios.put("http://localhost:8000/currencies/")

const taksModule = {
  namespaced: true,
  state: {
    currencies: [],
    conversed_value: ""
  },
  mutations: {
    get_currencies (state) {
      axios.get("http://localhost:8000/currencies/").then(Response => {
        for(var item in Response['data']['currencies']){
          var currency_name = Response['data']['currencies'][item]['name']
          state.currencies.push(currency_name)
        }
      })
    },
    convert_value(state, payload){
      axios.post("http://192.168.0.97:8000/currencies/?currency="+payload['currency']+"&value="+payload['amount']).then(Response=>{ 
        state.conversed_value = payload['amount']+" "+payload['currency']+" = " +Response['data']['result'].toFixed(2) +" ZAR"
      })
    }
  },
  actions:{
    get_currencies (context){
      context.commit('get_currencies')
    },
    convert_value(context, payload){
      context.commit('convert_value', payload)
    }

  }
}

export default new Vuex.Store({
  modules: {
    taksModule: taksModule
  }
});
