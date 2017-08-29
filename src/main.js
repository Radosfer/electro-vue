import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import {currency} from './currency'
import {focus} from './directives/focus'

Vue.filter('currency', currency)
Vue.directive('focus', focus)

const app = new Vue({
  el: '#app',
  data: {
    selected: ''
  },
  store,
  render: h => h(App)
})

app
