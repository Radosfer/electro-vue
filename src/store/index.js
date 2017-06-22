import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import * as actions from './actions'
import * as getters from './getters'
import streets from './modules/streets'
import houses from './modules/houses'
import groups from './modules/groups'
import mans from './modules/mans1'
import tariffs from './modules/tariffs'
import counters from './modules/counters'
import houseTestimony from './modules/houseTestimony'
import pay from './modules/pay'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

import ru from 'vee-validate/dist/locale/ru'
VeeValidate.Validator.addLocale(ru)
Vue.use(VeeValidate, {
  locale: 'ru'
})

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    streets,
    houses,
    groups,
    mans,
    tariffs,
    counters,
    houseTestimony,
    pay
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
