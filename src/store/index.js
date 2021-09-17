import { createStore } from 'vuex'
export default createStore({
  state: {
    myName: "kuji",
    userState:'',
  },
  mutations: {
    setGlobalUser(state, payload){
      state.userState = payload
    }
  },
  actions: {
  },
  getters: {
    getUserState(state) {
      return state.userState
    }
  },
})




