import Vue from 'vue'
import App from './App'
import store from './store'
import './uni.promisify.adaptor'
import uView from 'uview-ui'
import _ from "lodash";
Vue.use(uView)
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype._ = _;

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
