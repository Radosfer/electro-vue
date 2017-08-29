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
  allHouseTestimony: state => state.all
  // loadedHouseTestimony: state => state.loaded,
  // currentHouseTestimony: state => state.current
}

// actions
const actions = {

  addHouseTestimony ({commit}, data) {
    commit(types.HOUSE_LOADED)
    api.testimony.addHouseTestimony(data, house => {
      commit(types.HOUSE_EDITED, house)
      commit(types.GROUP_CALC_COUNT)
    })
  }
  // selectCounters ({commit}, houseTestimony) {
  //   commit(types.HOUSE_TESTIMONY_SELECT, {houseTestimony})
  //   api.testimony.getCounters(houseTestimony, counters => {
  //     commit(types.HOUSE_TESTIMONY_RECEIVE, {counters})
  //   })
  // }
}

// mutations
const mutations = {
  [types.HOUSE_TESTIMONY_LOADED] (state) {
    state.loaded = false
  },
  [types.HOUSE_TESTIMONY_ADD] (state, houseTestimony) {
    state.all.push(houseTestimony)
    state.loaded = true
  },
  [types.HOUSE_TESTIMONY_RECEIVE] (state, {houseTestimony}) {
    state.all = houseTestimony
    state.loaded = true
  },
  [types.HOUSE_TESTIMONY_SELECT] (state, {houseTestimony}) {
    state.current = houseTestimony
  },
  [types.HOUSE_LOADED] (state) {
    state.loaded = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
