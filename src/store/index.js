import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	Token:localStorage.getItem('token') ? localStorage.getItem('token') : '',
  },
  mutations: {
	setToken(state,token){
	  state.Token =token;
	  localStorage.setItem("token",token.token);     		//存储token
	},
	
	setUsername(state,user_name){
		state.NowUsername = user_name
		localStorage.setItem("username",user_name.user_name)
	},
	
	delToken(state){					//删除token userid
	  state.Token = '';
	  state.NowUsername = ''
	  localStorage.removeItem("token");    
	},
  },
  actions: {
  },
  modules: {
  }
})
