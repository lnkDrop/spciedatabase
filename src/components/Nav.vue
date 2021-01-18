<template>
	<div id="Nav">
		<div id="nav-main">
			<div id="nav-main-left">
				香料数据库管理平台
			</div>
			<div id="nav-main-right">
				<ul>
					<li @click="logOut()">退出</li>
					<li>/</li>
					<li>{{username}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default{
		name:'Nav',
		data(){
			return{
				username:'',
			}
		},
		created(){
			this.username = localStorage.getItem('username')
		},
		methods:{
			...mapMutations(['delToken']),
			logOut(){
				this.delToken({token:''});
				this.$router.push('/')
			}
		}
	}
</script>

<style>
	#nav-main{
		width: 100%;
		height: 60px;
		background-color: #303133;
	}
	#nav-main-left{
		padding-left: 40px;
		width: 50%;
		height: 60px;
		line-height: 60px;
		color: white;
		float: left;
	}
	#nav-main-right{
		padding-right: 40px;
		width: 50%;
		height: 60px;
		line-height: 60px;
		color: white;
		float: left;
	}
	#nav-main-right ul{
		list-style: none;
	}
	#nav-main-right li{
		display: inline-block;
		margin: 0 10px;
		float: right;
		cursor: pointer;
		
	}
</style>
