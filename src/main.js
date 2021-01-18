import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'http://127.0.0.1:5000/'

Vue.prototype.ToJson = function (arr){
  var json = {}
  for(var i=0;i<arr.length;i++){
	  json[i]=arr[i]
  }
  JSON.stringify(json)
  console.log(json,typeof json)
  return json
}

axios.interceptors.request.use(config => {
//判断是否存在token，如果存在将每个页面的header都添加token
  if(store.state.token){
    config.headers.common['token']=store.state.token   //此处的XX-Token要根据登录接口中请求头的名字来写
  }
  return config;
}, error => {
// 请求错误
  return Promise.reject(error);
});
 
//respone拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  
  error => {  //默认除了2XX之外都为错误
    if(error.response){
      switch(error.response.status){
        case 401:
          this.$store.commit('delToken');
          router.replace({ //跳转到登录页面
            path: '/',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return Promise.reject(error.response);
  }
);

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
