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
    console.log(data)
    commit(types.HOUSE_LOADED)
    api.testimony.addHouseTestimony(data, house => {
      commit(types.HOUSE_EDITED, house)
    })
  },
  // getCounters ({commit}, data) {
  //   // console.log(data)
  //   api.house.getCounters(data, houseTestimony => {
  //     commit(types.HOUSE_TESTIMONY_RECEIVE, {houseTestimony})
  //   })
  // },
  selectCounters ({commit}, houseTestimony) {
    // console.log(houseTestimony)
    commit(types.HOUSE_TESTIMONY_SELECT, {houseTestimony})
    // commit(types.GROUP_SELECT, {})
    api.testimony.getCounters(houseTestimony, counters => {
      commit(types.HOUSE_TESTIMONY_RECEIVE, {counters})
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
  // [types.HOUSE_EDITED] (state, house) {
  //   console.log('edit')
  //   for (let i in state.all) {
  //     if (state.all[i].id === house.id) {
  //       state.all[i] = house
  //     }
  //   }
  //   state.loaded = true
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
