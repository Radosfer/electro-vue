/**
 * Created by talik on 06.04.17.
 */
import api from '../../api/electro'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false,
  current: null
}

// getters
const getters = {
  // allCounters: state => state.all,
  // loadedCounter: state => state.loaded,
  // currentCounter: state => state.current
}

// actions
const actions = {
  addPay ({commit}, data) {
    commit(types.PAY_LOADED)
    api.house.addPay(data, pay => {
      commit(types.PAY_ADD, pay)
    })
  }
}

// mutations
const mutations = {
  [types.PAY_LOADED] (state) {
    state.loaded = false
  },
  [types.PAY_ADD] (state, pay) {
    state.all.push(pay)
    state.loaded = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
