import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>import('../views/Login')
const Home = () =>import('../views/Home')
const ManageMainST = () =>import('../components/ManageMainST')
const AddMainST = () =>import('../components/AddMainST')
const EditMainST = () =>import('../components/EditMainST')
const ManageST = () =>import('../components/ManageST')
const AddST = () =>import('../components/AddST')
const EditST = () =>import('../components/EditST')
const ManageSST = () =>import('../components/ManageSST')
const AddSST = () =>import('../components/AddSST')
const EditSST = () =>import('../components/EditSST')
const ManagePop = () =>import('../components/ManagePop')
const ManageME = () =>import('../components/ManageME')
const ManagePhyPor = () =>import('../components/ManagePhyPor')
const ManageSpice = () =>import('../components/ManageSpice')
const AddSpice = () =>import('../components/AddSpice')
const EditSpice = () =>import('../components/EditSpice')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
	children:[
		{
			path:'managemainst',
			name:'ManageMainST',
			component:ManageMainST,
		},
		{
			path:'addmainst',
			name:'AddMainST',
			component:AddMainST
		},
		{
			path:'editmainst/:mainst_id',
			name:'EditMainST',
			component:EditMainST,
		},
		{
			path:'managest',
			name:'ManageST',
			component:ManageST
		},
		{
			path:'addst',
			name:'AddST',
			component:AddST
		},
		{
			path:'editst/:st_id',
			name:'EditST',
			component:EditST
		},
		{
			path:'managesst',
			name:'ManageSST',
			component:ManageSST
		},
		{
			path:'addsst',
			name:'AddSST',
			component:AddSST
		},
		{
			path:'editsst/:sst_id',
			name:'EditSST',
			component:EditSST
		},
		{
			path:'managepop',
			name:'ManagePop',
			component:ManagePop
		},
		{
			path:'manageme',
			name:'ManageME',
			component:ManageME
		},
		{
			path:'managephypor',
			name:'ManagePhyPor',
			component:ManagePhyPor
		},
		{
			path:'managespice',
			name:'ManageSpice',
			component:ManageSpice,
		},
		{
			path:'addspice',
			name:'AddSpice',
			component:AddSpice,
		},
		{
			path:'editspice/:spice_id',
			name:'EditSpice',
			component:EditSpice,
		}

	]
  },
  {
	path:'/',
	name:'Login',
	component:Login
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {    //若要跳转的页面是登录界面
    next();     //直接跳转
  }
  else {   //若要跳转的页面是个人界面
    let token = localStorage.getItem('token');    //获取本地存储的token值
    if (token===null||token===''){    //若token为空则验证不成功，跳转到登录页面
      next('/');
    }else{           //不为空则验证成功
      next();
    }
  }

});

export default router
