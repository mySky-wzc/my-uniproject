// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import mutations from './mutations';
import actions from "./actions"

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		funcList: [
			{
				id: 1,
				path: "/pages/zgjm/index",
				pic: "/static/logo.png",
				name: "周公解梦"
			}
		]
	},
    getters,
    mutations,
    actions
})
export default store
