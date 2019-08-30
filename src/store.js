import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

const taksModule = {
  namespaced: true,
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
          state.conversed_value =  payload['amount']+ " "+ payload['currency'] + " = " + (payload['amount']/Response['data'][payload['conversion']]) +" ZAR"
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
