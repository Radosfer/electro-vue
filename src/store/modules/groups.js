import api from '../../api/electro'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false,
  current: null,
  groupMode: null,
  currentTestimony: null
}

// getters
const getters = {
  allGroups: state => state.all,
  loadedGroup: state => state.loaded,
  currentGroup: state => state.current,
  groupModeG: state => state.groupMode,
  currentTestimony: state => state.currentTestimony
}

// actions
const actions = {
  getAllGroups ({commit}) {
    api.group.getGroups(groups => {
      commit(types.GROUPS_RECEIVE, {groups})
    })
  },
  // getAllGroups ({commit}) {
  //   api.group.getGroups(groups => {
  //     commit(types.GROUPS_RECEIVE, {groups})
  //   })
  // },
  selectGroup ({commit}, group) {
    commit(types.GROUP_SELECT, {group})
    commit(types.STREET_SELECT, {})
    // commit(types.GROUP_MODE_TRUE)
    commit(types.GROUP_MODE, true, {group})
    api.group.getHouses(group, houses => {
      commit(types.HOUSES_RECEIVE, {houses})
    })
    api.group.getGroupTestimony(group.id, testimony => {
      commit(types.GROUP_TESTIMONY_RECEIVE, testimony)
    })
  },
  editGroup ({commit}, data) {
    for (let i in state.all) {
      if (state.all[i].id === data.group.id) {
        commit(types.GROUP_LOADED)
        api.group.editGroup(state.all[i], data.value, group => {
          commit(types.GROUP_EDITED, group)
        })
      }
    }
  },
  addGroup ({commit}, title) {
    commit(types.GROUP_LOADED)
    api.group.addGroup(title, group => {
      commit(types.GROUP_ADD, group)
    })
  },
  addGroupTestimony ({commit}, data) {
    commit(types.GROUP_LOADED)
    api.group.addGroupTestimony(data, testimony => {
      commit(types.GROUP_TESTIMONY_ADD, testimony)
      console.log(testimony)
    })
  },
  deleteGroup ({commit}, group) {
    commit(types.GROUP_LOADED)
    api.group.deleteGroup(group, result => {
      if (result) {
        let i = state.all.indexOf(group)
        commit(types.GROUP_DELETE, i)
      }
    })
  }
}

// mutations
const mutations = {
  [types.GROUP_LOADED] (state) {
    state.loaded = false
  },
  [types.GROUPS_RECEIVE] (state, {groups}) {
    state.all = groups
    state.loaded = true
  },
  [types.GROUP_SELECT] (state, {group}) {
    state.current = group
  },
  [types.GROUP_EDITED] (state, group) {
    for (let i in state.all) {
      if (state.all[i].id === group.id) {
        state.all[i] = group
      }
    }
    state.loaded = true
  },
  [types.GROUP_ADD] (state, group) {
    state.all.push(group)
    state.loaded = true
  },
  [types.GROUP_TESTIMONY_ADD] (state, testimony) {
    state.currentTestimony = testimony
    state.loaded = true
  },
  [types.GROUP_TESTIMONY_RECEIVE] (state, testimony) {
    state.currentTestimony = testimony
  },
  [types.GROUP_DELETE] (state, i) {
    state.all.splice(i, 1)
    state.loaded = true
  },
  [types.GROUP_MODE] (state, mode) {
    state.groupMode = mode
    // state.curGroupId = group.id
    // console.log(state.groupMode)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
