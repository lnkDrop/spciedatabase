<template>
  <div id="Home">
	  <Nav></Nav>
	  <div id="home-main">
		<div id="home-main-left">
			<SideNav></SideNav>
		</div>
		<div id="home-main-right">
			<router-view></router-view>
		</div>
			
	  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav.vue'
import SideNav from '../components/SideNav.vue'
export default {
  name: 'Home',
  components: {
    Nav,
	SideNav,
  }
}
</script>

<style>
	#Home{
		width: 100%;
		height: auto;
		display: block;
	}
	#home-main-left{
		width: 20%;
		height: auto;

		float: left;
		display: block;
		background-color: rgb(84, 92, 100);
	}
	#home-main{
		width: 100%;
		height: auto;
		display: block;
		
	}
	#home-main-right{
		width: 80%;
		height: auto;
		min-height: 100vh;
		float: left;
		display: block;
		background-color: #ecf0f1;
		padding: 30px;
	}
</style>
