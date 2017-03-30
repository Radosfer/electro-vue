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
    // for (let i in state.all) {
    //   if (state.all[i].id === data.street.id) {
    //     commit(types.HOUSE_LOADED)
    //     api.editStreet(state.all[i], data.value, street => {
    //       commit(types.HOUSE_EDITED, street)
    //     })
    //   }
    // }
    for (let i in state.all) {
      // console.log(data.phone)
      // console.log(data.fio)
      // console.log(data)

      if (state.all[i].id === data.house.id) {
        commit(types.HOUSE_LOADED)
        // console.log(data)
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
