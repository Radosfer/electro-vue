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
    commit(types.HOUSE_LOADED)
    api.house.addPay(data, house => {
      commit(types.HOUSE_EDITED, house)
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
  },
  [types.HOUSE_LOADED] (state) {
    state.loaded = false
  },
  [types.HOUSE_EDITED] (state, house) {
    for (let i in state.all) {
      if (state.all[i].id === house.id) {
        state.all[i] = house
      }
    }
    state.loaded = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
