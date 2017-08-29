/**
 * Created by talik on 23.03.17.
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
  allMans: state => state.all,
  loadedMan: state => state.loaded,
  currentMan: state => state.current
}

// actions
const actions = {
  addMan ({commit}, title1) {
    commit(types.MAN_LOADED)
    api.house.addMan(title1, man => {
      commit(types.MAN_ADD, man)
    })
  }
}

// mutations
const mutations = {
  [types.MAN_LOADED] (state) {
    state.loaded = false
  },
  [types.MAN_ADD] (state, man) {
    state.all.push(man)
    state.loaded = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
