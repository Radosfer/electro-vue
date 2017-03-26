import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import streets from './modules/streets'
import houses from './modules/houses'
import groups from './modules/groups'
import mans from './modules/mans'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    streets,
    houses,
    groups,
    mans
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
