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
				pic: "/static/dream.png",
				name: "周公解梦"
			},
			{
				id: 2,
				path: "/pages/kdcx/index",
				pic: "/static/logist.png",
				name: "快递查询"
			},
			{
				id: 3,
				path: "/pages/cpcx/index",
				pic: "/static/menu.png",
				name: "菜谱查询"
			}
		]
	},
    getters,
    mutations,
    actions
})
export default store
