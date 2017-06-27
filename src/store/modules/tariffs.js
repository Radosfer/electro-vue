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
  currentTariff: state => state.current
}

// actions
const actions = {
  getAllTariffs ({commit}) {
    api.tariff.getTariffs(tariffs => {
      commit(types.TARIFFS_RECEIVE, {tariffs})
    })
  },
  addTariff ({commit}, title) {
    commit(types.TARIFF_LOADED)
    api.tariff.addTariff(title, tariff => {
      commit(types.TARIFF_ADD, tariff)
      commit(types.STREET_SELECT, {})
      commit(types.GROUP_SELECT, {})
      api.tariff.getHouses(houses => {
        commit(types.HOUSES_RECEIVE, {})
      })
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
    state.current = tariffs.value
    state.loaded = true
  },
  [types.TARIFF_SELECT] (state, {tariffs}) {
    state.current = tariffs
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
    state.current = tariff.value
    state.loaded = true
    state.currentSt = tariff.value
    state.currentGr = tariff.value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
