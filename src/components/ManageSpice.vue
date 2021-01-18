<template>
	<div id="ManageSpice">
		<div>
			<h3>香料信息管理</h3>
		</div>
		<div id="ManageSpice-header">
			<el-link href='/home/addspice'>添加香料<i class="el-icon-circle-plus-outline el-icon--right"></i> </el-link>
			<div id="ManageSpice-header-search">
				<el-input v-model="search_key" @change="clearSearchKey()" size="mini"></el-input>
				<el-button @click="spiceSearch()" type="primary" size="mini">搜索</el-button>
			</div>
			
		</div>
		<div id="managespice-list">
			<ul>
				<li id="managespice-list-header">
					<div class="managespice-list-header managespice-list-first">序号</div>
					<div class="managespice-list-header">中文名称</div>
					<div class="managespice-list-header">英文名称</div>
					<div class="managespice-list-header">管理</div>
				</li>
				<li v-for="(item,index) in pageitems" class="managespice-list-item">
					<div class="managespice-list-header managespice-list-first">
						{{index + 1}}
					</div>
					<div class="managespice-list-header">{{item.name}}</div>
					<div class="managespice-list-header">{{item.english_name}}</div>
					<div class="managespice-list-manage">
						<el-button @click="goEditSpice(index)" type="primary" size="mini">编辑</el-button>
					</div>
					<div class="managespice-list-manage">
						<el-popconfirm
						 @confirm="delSpice(index)"
						  title="这是一段内容确定删除吗？"
						>
						  <el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm>
					</div>
				</li>
			</ul>
			
		</div>
		<el-pagination
		  v-if="items.length>19"
		  layout="prev, pager, next"
		  :total="items.length"
		  :current-page="pages"
		  :page-size= 20
		@current-change='handleCurrentChange'>
		  
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name:'ManageSpice',
		data(){
			return{
				items:[],
				pageitems:[],
				search_key:'',
				pages:1,
			}
		},
		created() {
			this.$axios({
				method:'post',
				url:'/spice/list',
				data:{
					"search_key":"",
				}
			}).then((res)=>{
				console.log(res)
				this.items = res.data
				this.pageitems = res.data.slice(0,20)
			})
		},
		methods:{
			spiceSearch(){
				if(this.search_key ===''){
					this.$message.warning('请先输入检索词')
				}else{
					this.$axios({
						method:'post',
						url:'/spice/list',
						data:{
							"search_key":this.search_key,
						},
					}).then((res) =>{
						this.items = res.data
						this.pageitems = res.data.slice(0,20)
					})
				}
				
			},
			clearSearchKey(){
				if(this.search_key===''){
					this.$axios({
						method:'post',
						url:'/spice/list',
						data:{
							"search_key":"",
						}
					}).then((res)=>{
						console.log(res)
						this.items = res.data
						this.pageitems = res.data.slice(0,20)
					})
				}
			},
			ChangePages(val){
				this.pageitems = this.items.slice((val-1)*20,val*20)				
			},
			handleCurrentChange(val){
				console.log(val,this.pages)
				this.pages = val
				this.ChangePages(val)
				
			},
			delSpice(index){
				let spice_id = this.pageitems[index].id
				this.$axios.get('/del/spice/' + spice_id).then((res)=>{
					if(res.data === 1){
						this.$axios({
							method:'post',
							url:'/spice/list',
							data:{
								"search_key":"",
							}
						}).then((res1)=>{
							console.log(res1)
							this.items = res1.data
							this.pageitems = res1.data.slice(0,20)
						})
						this.$message.success('删除香料信息成功')
					}else{
						this.$message.error('删除香料信息失败')
					}
				})
			},
			goEditSpice(index){
				let spice_id = this.pageitems[index].id
				this.$router.push('/home/editspice/' + spice_id)
				
			}
			
		}
		
	}
</script>

<style>
	#ManageSpice{
		width: 100%;
		height: auto;
		background-color: white;
		padding: 10px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#ManageSpice-header-search{
		height: 28px;
		display: flex;
		flex-direction: row;
		width: 60%;
		margin-top: 5px;
	}
	#ManageSpice h3{
		margin: 10px 0;
	}
	#managespice-main{
		height: 30px;
	}
	#managespice-list{
		width: 100%;
		height: auto;
		margin-top: 10px;
		margin-bottom: 20px;
		clear: both;
	}
	#managespice-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#managespice-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#managespice-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#managespice-list li:last-child{
		border-bottom: 0;
	}
	.managespice-list-header{
		width: 31%;
		text-align: left;
	}
	.managespice-list-first{
		width: 5%;
	}
	.managespice-list-fourth{
		width: 25%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managespice-list-header{
		float: left;	
	}
	.managespice-list-manage{
		width: 8%;
		color: #3A8EE6;
		float: left;
		cursor: pointer;
	}


</style>
