<template>
	<div id="SideNav">
		 <el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose"
		      background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#0984e3">
		      <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-menu"></i>
		          <span>香料分类管理</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="1-1">
					  <a href="/home/managemainst">主分类</a>
				  </el-menu-item>
		          <el-menu-item index="1-2">
					 <a href="/home/managest">一级分类</a>
				  </el-menu-item>
				  <el-menu-item index="1-3">
					  <a href="/home/managesst">二级分类</a>
				  </el-menu-item>
				</el-menu-item-group>
		      </el-submenu>
			  <el-submenu index="2">
			    <template slot="title">
			      <i class="el-icon-s-grid"></i>
			      <span>香料信息管理</span>
			    </template>
			    <el-menu-item-group>
			      <el-menu-item index="2-1">
					<a href="/home/managepop">产地管理</a>
			  	  </el-menu-item>
			      <el-menu-item index="2-2">
			  		<a href="/home/manageme">成分管理</a>
			  	  </el-menu-item>
			  	  <el-menu-item index="2-3">
			  		<a href="/home/managephypor">物理性质管理</a>
			  	  </el-menu-item>
				  <el-menu-item index="2-3">
				  	<a href="/home/managespice">香料管理</a>
				  </el-menu-item>
			  </el-menu-item-group>
			  
			  </el-submenu>
		      <el-menu-item index="3">
		        <i class="el-icon-s-flag"></i>
		        <span slot="title">香料文化</span>
		      </el-menu-item>
		      <el-menu-item index="4">
		        <i class="el-icon-document"></i>
		        <span slot="title">香料新闻</span>
		      </el-menu-item>
		      <el-menu-item index="5">
		        <i class="el-icon-s-custom"></i>
		        <span slot="title">用户管理</span>
		      </el-menu-item>
		    </el-menu>
	</div>
</template>

<script>
	export default{
		name:'SideNav',
		methods: {
		      handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		      },
		      handleClose(key, keyPath) {
		        console.log(key, keyPath);
				}
		},
	}
</script>

<style>

#SideNav ul{
	border: 0;
}
#SideNav a{
	text-decoration: none;
	color: white;
}
</style>
