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
  allCounters: state => state.all,
  loadedCounter: state => state.loaded,
  currentCounter: state => state.current
}

// actions
const actions = {
  addCounter ({commit}, data) {
    commit(types.COUNTER_LOADED)
    api.house.addCounter(data, counter => {
      commit(types.COUNTER_ADD, counter)
    })
  },
  addNewCounter ({commit}, data) {
    // console.log(data)
    commit(types.HOUSE_LOADED)
    api.house.addNewCounter(data, house => {
      // console.log(data)
      commit(types.HOUSE_EDITED, house)
    })
  }
}

// mutations
const mutations = {
  [types.COUNTER_LOADED] (state) {
    state.loaded = false
  },
  [types.COUNTER_ADD] (state, counter) {
    state.all.push(counter)
    state.loaded = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
/**
 * Created by talik on 04.04.17.
 */
