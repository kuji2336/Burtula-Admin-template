import { createStore } from 'vuex'
import moduleA from './moduleA'
import moduleC from './moduleC'
export default createStore({
  state: {
    myName: "kuji"
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getStoreValue(state) {
      return state.myName
    }
  },
  modules: {
    moduleA,
    moduleC
  }
})



