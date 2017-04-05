/**
 * Created by talik on 04.04.17.
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
  allHouseTestimony: state => state.all,
  loadedHouseTestimony: state => state.loaded,
  currentHouseTestimony: state => state.current
}

// actions
const actions = {
  addHouseTestimony ({commit}, data) {
    // console.log(data)
    commit(types.HOUSE_TESTIMONY_LOADED)
    api.testimony.addHouseTestimony(data, houseTestimony => {
      commit(types.HOUSE_TESTIMONY_ADD, houseTestimony)
    })
  }
}

// mutations
const mutations = {
  [types.HOUSE_TESTIMONY_LOADED] (state) {
    state.loaded = false
  },
  [types.HOUSE_TESTIMONY_ADD] (state, houseTestimony) {
    state.all.push(houseTestimony)
    state.loaded = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
