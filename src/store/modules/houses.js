import api from '../../api/electro'
import * as types from '../mutation-types'
// import Vue from 'vue'

// initial state
const state = {
  all: [],
  loaded: false,
  current: null
}

// getters
const getters = {
  allHouses: state => state.all,
  loadedHouse: state => state.loaded,
  currentHouse: state => state.current
}

// actions
const actions = {
  selectHouse ({commit}, house) {
    commit(types.HOUSE_SELECT, {house})
    api.getHouses(house, houses => {
      // console.log(houses)
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
  }
  // addCounter ({commit}, data) {
  //   commit(types.HOUSE_LOADED)
  //   api.house.addCounter(data, house => {
  //     commit(types.HOUSE_ADD, house)
  //   })
  // }
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
  [types.HOUSE_SELECT] (state, {street}) {
    state.current = street
  },
  // [types.HOUSE_EDITED] (state, street) {
  //   for (let i in state.all) {
  //     if (state.all[i].id === street.id) {
  //       state.all[i] = street
  //     }
  //   }
  //   state.loaded = true
  // },
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
