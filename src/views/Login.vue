<template>
	<div id="Login">
		<div id="login-main">
			<h3>香料数据库管理</h3>
			<p class="login-main-items">用户名</p>
			<el-input v-model="username" class="login-main-items" type="text" placeholder="输入用户名"></el-input>
			<p class="login-main-items">密码</p>
			<el-input v-model="password" type="password" class="login-main-items" placeholder="输入密码"></el-input>
			<el-button @click="Login()" id="login-btu" class="login-main-items" type="primary" >登录</el-button>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default{
		name:'Login',
		data(){
			return{
				username:'',
				password:'',
				tips:''
			}
		},
		methods:{
			...mapMutations(['setToken','setUsername']),
			Login(){
				if(this.username === '' || this.password === ''){
					this.$message.warning('请先输入账号密码！')
				}else{
					this.$axios({
						method:'post',
						url:'/user/login',
						data:{
							username:this.username,
							password:this.password
						}
					}).then((res) =>{
						console.log(res)
						if(res.data.success === 1){
							
							this.password = ''
							this.setToken({token: res.data.token})
							this.setUsername({user_name:this.username})
							console.log(localStorage.getItem('user_name'))
							this.username = ''
							this.$router.push('/home')
						}else{
							this.username = ''
							this.password = ''
							this.$message.error('登录失败')
						}
					}).catch((err) =>{
						console.log(err)
					})
				}
			},
		}
	}
</script>

<style>
	#Login{
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background:url(../assets/loginbackground.png)no-repeat;
		background-size:100% 100%;
	}
	#login-main{
		width: 600px;
		height: 400px;
		background-color: rgb(0,0,0,0.3);
		border-radius: 5px;
		display: block;
		padding: 35px 100px;
		 box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.5)
	}
	#login-main h3{
		color: white;
		text-align: center;
		font-size: 24px;
		font-weight: 400;
	}
	.login-main-items{
		margin: 10px 0;
		width: 100%;
		color: white;
	}
	#login-btu{
		margin-top: 40px;
	}

</style>
