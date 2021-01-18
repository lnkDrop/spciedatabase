<template>
	<div id="ManageST">
		<h3>管理香料一级分类</h3>
		<div id="managest-main">
			<el-link href='/home/addst'>添加香料一级分类<i class="el-icon-circle-plus-outline el-icon--right"></i> </el-link>
			<div id="mainst-filter">
				<span>筛选：</span>
				<el-select @change="filterSt()" size="mini" v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select> 
				<el-button type='success'size='mini' @click='clearFilter()'>清除</el-button>
			</div>
		</div>
		
		<div id="managest-list">
			<ul>
				<li id="managest-list-header">
					<div class="managest-list-header managest-list-first">序号</div>
					<div class="managest-list-header">分类名称</div>
					<div class="managest-list-header">主分类</div>
					<div class="managest-list-header managest-list-fourth">分类简介</div>
					<div class="managest-list-header">管理</div>
				</li>
				<li v-for="(item,index) in page_items" class="managest-list-item">
					<div class="managest-list-header managest-list-first">
						{{index + 1}}
					</div>
					<div class="managest-list-header">{{item.name}}</div>
					<div class="managest-list-header">{{item.maincategroy}}</div>
					<div class="managest-list-header managest-list-fourth">{{item.introduction}}</div>
					<div class="managest-list-manage">
						<el-button @click="EditST(index)" type="primary" size="mini">编辑</el-button>
					</div>
					<div class="managest-list-manage">
						<el-popconfirm
						 @confirm="delST(index)"
						  title="这是一段内容确定删除吗？"
						>
						  <el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm>
					</div>
				</li>
			</ul>
		</div>
		<el-pagination
		  v-if="items.length>9"
		  layout="prev, pager, next"
		  :total="items.length"
		  :current-page="pages"
		  :page-size= 9
		 @current-change='handleCurrentChange'>
		  
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name:'ManageST',
		data(){
			return{
				items:[],
				value:'',
				options:[],
				pages:0,
				page_items:[],
			}
		},
		created(){
			this.$axios.get('/get/stlist').then((res)=>{
				this.items = res.data
				this.page_items = res.data.slice(0,9)
				console.log(res.data)
				this.$axios.get('/manage/maincategroy/list').then((res1)=>{
					console.log(res1)
					let options = []
					for(var i=0;i<res1.data.length;i++){
						console.log(res1.data[i].name)
						let nowjson = {"value":"", "lable":""}
						nowjson.value = res1.data[i].name
						nowjson.lable = res1.data[i].name
						options.push(nowjson)
						nowjson = {"value":"", "lable":""}
					}
					this.options = options
				})
			})
		},
		methods:{
			filterSt(){
				let filter_key = this.value
				this.$axios.get('/get/stlist/' + filter_key).then((res)=>{
					console.log(res)
					this.items = res.data
					this.page_items = res.data.slice(0,9)
				})
			},
			clearFilter(){
				this.$axios.get('/get/stlist').then((res)=>{
					this.items = res.data
					this.page_items = res.data.slice(0,9)
					console.log(res.data)
					this.$axios.get('/manage/maincategroy/list').then((res1)=>{
						console.log(res1)
						let options = []
						for(var i=0;i<res1.data.length;i++){
							console.log(res1.data[i].name)
							let nowjson = {"value":"", "lable":""}
							nowjson.value = res1.data[i].name
							nowjson.lable = res1.data[i].name
							options.push(nowjson)
							nowjson = {"value":"", "lable":""}
						}
						this.options = options
						this.value = ''
					})
				})
			},
			EditST(index){
				let id = this.page_items[index].id
				this.$router.push('/home/editst/'+id)
			},
			delST(index){
				console.log(index)
				let id = this.page_items[index].id
				this.$axios.get('/del/st/' + id).then((res)=>{
					if(res.data == 1){
						this.$message.success('删除香料一级分类成功！')
						this.$axios.get('/get/stlist').then((res)=>{
							console.log(res)
							this.items = res.data
							this.page_items = res.data.slice(0,9)
							this.pages = 1
						})
					}else if(res.data == 2){
						this.$message.warning('该分类下还有二级分类，无法删除！')
					}else{
						this.$message.error('删除香料一级分类失败！')
					}
				})
			},
			ChangePages(val){			
				this.page_items = this.items.slice((val-1)*9,val*9)				
			},
			handleCurrentChange(val){
				console.log(val,this.pages)
				this.pages = val
				this.ChangePages(val)
				
			},
			
		},
		
		
	}
</script>

<style>
	#ManageST{
		width: 100%;
		height: 700px;
		background-color: white;
		padding: 10px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#ManageST h3{
		margin: 10px 0;
	}
	#managest-main{
		height: 30px;
	}
	#managest-list{
		width: 100%;
		height: 500px;
		margin-top: 10px;
		margin-bottom: 20px;
		clear: both;
	}
	#managest-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#managest-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#managest-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#managest-list li:last-child{
		border-bottom: 0;
	}
	.managest-list-header{
		width: 23%;
		text-align: left;
	}
	.managest-list-first{
		width: 5%;
	}
	.managest-list-fourth{
		width: 25%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managest-list-header{
		float: left;	
	}
	.managest-list-manage{
		width: 7%;
		color: #3A8EE6;
		float: left;
		cursor: pointer;
	}
	#mainst-filter{
		float: right;
	}
	#mainst-filter span{
		font-size: 13px;
	}
	#mainst-filter button{
		margin-left: 10px;
	}
</style>
