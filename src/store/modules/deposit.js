/**
 * Created by talik on 20.07.17.
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
  allDeposits: state => state.all
  // loadedCounter: state => state.loaded,
  // currentCounter: state => state.current
}

// actions
const actions = {
  addDeposit ({commit}, data) {
    console.log(data)
    commit(types.DEPOSIT_LOADED)
    api.house.addDeposit(data, deposit => {
      commit(types.DEPOSIT_ADD, deposit)
      api.house.getDeposit(data, deposit => {
        commit(types.DEPOSIT_RECEIVE, deposit)
      })
    })
  },
  getDeposit  ({commit}, data) {
    api.house.getDeposit(data, deposit => {
      commit(types.DEPOSIT_RECEIVE, deposit)
    })
  }
}

// mutations
const mutations = {
  [types.DEPOSIT_LOADED] (state) {
    state.loaded = false
  },
  [types.DEPOSIT_ADD] (state, deposit) {
    state.all.push(deposit)
    state.loaded = true
  },
  [types.DEPOSIT_RECEIVE] (state, deposit) {
    state.all = deposit
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
