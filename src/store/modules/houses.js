import api from '../../api/electro'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false,
  current: null,
  history: null,
  countG: null
}

// getters
const getters = {
  allHouses: state => state.all,
  loadedHouse: state => state.loaded,
  currentHouse: state => state.current,
  historyHouse: state => state.history,
  count: state => state.countG
}

// actions
const actions = {
  selectHouse ({commit}, house) {
    commit(types.HOUSE_SELECT, {house})
    api.getHouses(house, houses => {
    })
  },
  editHouse ({commit}, data) {
    for (let i in state.all) {
      if (state.all[i].id === data.house.id) {
        commit(types.HOUSE_LOADED)
        api.house.editHouse(state.all[i], data.fio, data.phone, house => {
          commit(types.HOUSE_EDITED, house)
        })
      }
    }
  },
  addHouse ({commit}, title) {
    commit(types.HOUSE_LOADED)
    api.house.addHouse(title, house => {
      commit(types.HOUSE_ADD, house)
    })
  },
  getHistory ({commit}, data) {
    api.house.getHistory(data, history => {
      commit(types.HISTORY_RECEIVE, history)
    })
  }
}

// mutations
const mutations = {
  [types.HOUSE_LOADED] (state) {
    state.loaded = false
  },
  [types.HOUSES_RECEIVE] (state, {houses}) {
    state.all = houses
    state.loaded = true
  },
  [types.GROUP_CALC_COUNT] (state) {
    state.countG = null
    for (let i in state.all) {
      state.countG = state.countG + state.all[i].spent
    }
  },
  [types.HOUSE_SELECT] (state, {street}) {
    state.current = street
  },
  [types.HOUSE_EDITED] (state, house) {
    for (let i in state.all) {
      if (state.all[i].id === house.id) {
        state.all[i] = house
      }
    }
    state.loaded = true
  },
  [types.HOUSE_ADD] (state, street) {
    state.all.push(street)
    state.loaded = true
  },
  [types.HISTORY_RECEIVE] (state, history) {
    state.history = history
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
