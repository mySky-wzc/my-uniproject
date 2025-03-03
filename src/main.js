import Vue from 'vue'
import App from './App'
import store from './store'
import './uni.promisify.adaptor'
import uView from 'uview-ui'
import _ from "lodash";
import dayjs from 'dayjs';

// #ifdef H5
import Vconsole from "vconsole";
let vConsole = new Vconsole();
export default vConsole
// #endif
Vue.use(uView)
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype._ = _;
Vue.prototype.$$dayjs = dayjs

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
