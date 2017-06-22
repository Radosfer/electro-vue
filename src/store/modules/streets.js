import api from '../../api/electro'
import * as types from '../mutation-types'
// import groupMode from '../modules/groups'

// initial state
const state = {
  all: [],
  loaded: false,
  current: null,
  groupMode: null
}

// getters
const getters = {
  allStreets: state => state.all,
  loadedStreet: state => state.loaded,
  currentStreet: state => state.current

}

// actions
const actions = {
  getAllStreets ({commit}) {
    api.street.getStreets(streets => {
      commit(types.STREETS_RECEIVE, {streets})
    })
  },
  selectStreet ({commit}, street) {
    commit(types.STREET_SELECT, {street})
    commit(types.GROUP_SELECT, {})
    commit(types.GROUP_MODE, false)
    api.street.getHouses(street, houses => {
      commit(types.HOUSES_RECEIVE, {houses})
    })
  },
  editStreet ({commit}, data) {
    for (let i in state.all) {
      if (state.all[i].id === data.street.id) {
        commit(types.STREET_LOADED)
        api.street.editStreet(state.all[i], data.value, street => {
          commit(types.STREET_EDITED, street)
        })
      }
    }
  },
  addStreet ({commit}, title, cb) {
    commit(types.STREET_LOADED)
    api.street.addStreet(title, street => {
      commit(types.STREET_ADD, street)
    })
  },
  deleteStreet ({commit}, street) {
    commit(types.STREET_LOADED)
    api.street.deleteStreet(street, result => {
      if (result) {
        let i = state.all.indexOf(street)
        commit(types.STREET_DELETE, i)
      }
    })
  }
}

// mutations
const mutations = {
  [types.STREET_LOADED] (state) {
    state.loaded = false
  },
  [types.STREETS_RECEIVE] (state, {streets}) {
    state.all = streets
    state.loaded = true
  },
  [types.STREET_SELECT] (state, {street}) {
    state.current = street
  },
  [types.STREET_EDITED] (state, street) {
    for (let i in state.all) {
      if (state.all[i].id === street.id) {
        state.all[i] = street
      }
    }
    state.loaded = true
  },
  [types.STREET_ADD] (state, street) {
    state.all.push(street)
    state.loaded = true
  },
  [types.STREET_DELETE] (state, i) {
    state.all.splice(i, 1)
    state.loaded = true
  },
  [types.GROUP_MODE_FALSE] (state) {
    state.groupMode = false
    console.log(state.groupMode)
  },
  [types.GROUP_MODE_TRUE] (state, mode) {
    state.groupMode = mode
    console.log(state.groupMode)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
