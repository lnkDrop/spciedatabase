<template>
	<div id="ManageMainST">
		<div id="managemainst-main">
			<h3>香料主分类管理</h3>
			<el-link href='/home/addmainst'>添加香料主分类<i class="el-icon-circle-plus-outline el-icon--right"></i> </el-link>
			<div id="managemainst-list">
				<ul>
					<li id="managemainst-list-header">
						<div class="managemainst-list-header managemainst-list-first">序号</div>
						<div class="managemainst-list-header">分类名称</div>
						<div class="managemainst-list-header managemainst-list-third">分类简介</div>
						<div class="managemainst-list-header">管理</div>
					</li>
					<li v-for="(item,index) in items" class="managemainst-list-item">
						<div class="managemainst-list-header managemainst-list-first">
							{{index + 1}}
						</div>
						<div class="managemainst-list-header">{{item.name}}</div>
						<div class="managemainst-list-header managemainst-list-third">{{item.introduction}}</div>
						<div class="managemainst-list-manage">
							<el-button @click="goEditMainST(index)" type="primary" size="mini">编辑</el-button>
						</div>
						<div class="managemainst-list-manage">
							<el-popconfirm
							 @confirm="delMainST(index)"
							  title="这是一段内容确定删除吗？"
							>
							  <el-button type="danger" size="mini" slot="reference">删除</el-button>
							</el-popconfirm>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'ManageMainST',
		data(){
			return{
				items:[],
			}
		},
		created() {
			this.$axios.get('/manage/maincategroy/list').then((res)=>{
				console.log(res)
				this.items = res.data 
			})
		},
		methods:{
			goEditMainST(index){
				let id = this.items[index].id
				this.$router.push('/home/editmainst/'+id)
			},
			delMainST(index){
				console.log(index)
				let id = this.items[index].id
				this.$axios.get('/delete/maincategroy/' + id).then((res)=>{
					if(res.data == 1){
						this.$message.success('删除香料主类型成功！')
						this.$axios.get('/manage/maincategroy/list').then((res)=>{
							console.log(res)
							this.items = res.data 
						})
					}else if(res.data == 2){
						this.$message.warning('请先删除该分类下的一级分类与二级分类！')
					}else{
						this.$message.error('删除香料主类型失败！')
					}
				})
			}
		},
		
	}
</script>

<style>
	#ManageMainST{
		width: 100%;
		height: 700px;
		background-color: white;
		padding: 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#managemainst-main h3{
		margin: 10px 0;
	}
	#managemainst-list{
		width: 100%;
		height: 500px;
		margin:10px 0;
	}
	#managemainst-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#managemainst-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#managemainst-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#managemainst-list li:last-child{
		border-bottom: 0;
	}
	.managemainst-list-header{
		width: 25%;
		text-align: left;
	}
	.managemainst-list-first{
		width: 5%;
	}
	.managemainst-list-third{
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managemainst-list-header{
		float: left;	
	}
	.managemainst-list-manage{
		width: 7%;
		color: #3A8EE6;
		float: left;
		cursor: pointer;
	}
</style>
