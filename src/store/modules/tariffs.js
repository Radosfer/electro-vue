/**
 * Created by talik on 28.03.17.
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
  allTariffs: state => state.all,
  loadedTariff: state => state.loaded,
  currentTariff: state => state.current
}

// actions
const actions = {
  getAllTariffs ({commit}) {
    api.tariff.getTariffs(tariffs => {
      commit(types.TARIFFS_RECEIVE, {tariffs})
    })
  },
  // selectTariff ({commit}, street) {
  //   commit(types.STREET_SELECT, {street})
  //   commit(types.GROUP_SELECT, {})
  //   api.tariff.getHouses(street, houses => {
  //     commit(types.HOUSES_RECEIVE, {houses})
  //   })
  // },
  // editTariff ({commit}, data) {
  //   for (let i in state.all) {
  //     if (state.all[i].id === data.street.id) {
  //       commit(types.STREET_LOADED)
  //       api.tariff.editStreet(state.all[i], data.value, street => {
  //         commit(types.STREET_EDITED, street)
  //       })
  //     }
  //   }
  // },
  addTariff ({commit}, title) {
    // console.log(title)
    commit(types.TARIFF_LOADED)
    api.tariff.addTariff(title, tariff => {
      commit(types.TARIFF_ADD, tariff)
    })
  }
}

// mutations
const mutations = {
  [types.TARIFF_LOADED] (state) {
    state.loaded = false
  },
  [types.TARIFFS_RECEIVE] (state, {tariffs}) {
    state.all = tariffs
    state.loaded = true
  },
  [types.TARIFF_SELECT] (state, {tariff}) {
    state.current = tariff
  },
  [types.TARIFF_EDITED] (state, tariff) {
    for (let i in state.all) {
      if (state.all[i].id === tariff.id) {
        state.all[i] = tariff
      }
    }
    state.loaded = true
  },
  [types.TARIFF_ADD] (state, tariff) {
    state.all.push(tariff)
    state.loaded = true
  }
  // [types.TARIFF_DELETE] (state, i) {
  //   state.all.splice(i, 1)
  //   state.loaded = true
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
