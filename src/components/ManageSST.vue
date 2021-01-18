<template>
	<div id="ManageSST">
		<h3>管理香料二级分类</h3>
		<div id="managesst-main">
			<el-link href='/home/addsst'>添加香料二级分类<i class="el-icon-circle-plus-outline el-icon--right"></i> </el-link>
			<div id="mainsst-filter">
				<span>筛选：</span>
				<el-select @change="filterSt();getSST()" size="mini" v-model="value1" placeholder="香料主分类">
				    <el-option	
				      v-for="item in options1"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value1">
				    </el-option>
				</el-select>
				<el-select
				 @change="filterSt()" 
				 v-if="value1 !==''"
				 size="mini" 
				 v-model="value2" 
				 placeholder="香料一级分类">
				    <el-option
				      v-for="item in options2"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value2">
				    </el-option>
				</el-select> 
				<el-button type='success'size='mini' @click='clearFilter()'>清除</el-button>
			</div>
		</div>
		
		<div id="managesst-list">
			<ul>
				<li id="managesst-list-header">
					<div class="managesst-list-header managesst-list-first">序号</div>
					<div class="managesst-list-header">分类名称</div>
					<div class="managesst-list-header">主分类</div>
					<div class="managesst-list-header">一级分类</div>
					<div class="managesst-list-header managesst-list-fith">分类简介</div>
					<div class="managesst-list-header">管理</div>
				</li>
				<li v-for="(item,index) in page_items" class="managesst-list-item">
					<div class="managesst-list-header managesst-list-first">
						{{index + 1}}
					</div>
					<div class="managesst-list-header managesst-list-second">{{item.name}}</div>
					<div class="managesst-list-header managesst-list-third">{{item.maincategroy}}</div>
					<div class="managesst-list-header managesst-list-fourth">{{item.categroy}}</div>
					<div class="managesst-list-header managesst-list-fith">{{item.introduction}}</div>
					<div class="managesst-list-manage">
						<el-button @click="goEditSST(index)" type="primary" size="mini">编辑</el-button>
					</div>
					<div class="managesst-list-manage">
						<el-popconfirm
						 @confirm="delSST(index)"
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
		  @current-change='handleCurrentChange'
		  >
		  
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name:'ManageSST',
		data(){
			return{
				items:[],
				page_items:[],
				value1:'',
				value2:'',
				options1:[],
				options2:[],
				pages:1,
			}
		},
		created() {
			this.$axios.get('/manage/sst').then((res)=>{
				console.log(res)
				this.items = res.data
				this.page_items = res.data.slice(0,9)
				this.$axios.get('/manage/maincategroy/list').then((res1)=>{
					console.log(res1)
					let options = []
					for(var i=0;i<res1.data.length;i++){
						console.log(res1.data[i].name)
						let nowjson = {"value1":"", "lable1":""}
						nowjson.value1 = res1.data[i].name
						nowjson.lable1 = res1.data[i].name
						options.push(nowjson)
						nowjson = {"value1":"", "lable1":""}
					}
					this.options1 = options
				})
			})
		},
		methods:{
			filterSt(){
				let filter_key_mainst = this.value1
				this.$axios({
					method:'post',
					url:'/filter/sst',
					data:{
						mainst:this.value1,
						st:this.value2,
					}
				}).then((res)=>{
					console.log(res)
					this.items = res.data
					this.page_items = res.data.slice(0,9)
				})		
			},
			getSST(){
				this.$axios.get('/get/stlist/' + this.value1).then((res2)=>{
					console.log(res2)
					let options = []
					for(var i=0;i<res2.data.length;i++){
						console.log(res2.data[i].name)
						let nowjson = {"value2":"", "lable2":""}
						nowjson.value2 = res2.data[i].name
						nowjson.lable2 = res2.data[i].name
						options.push(nowjson)
						nowjson = {"value2":"", "lable2":""}
					}
					this.options2 = options
				})
			},
			clearFilter(){
				this.$axios.get('/manage/sst').then((res)=>{
					console.log(res)
					this.items = res.data
					this.page_items = res.data.slice(0,9)
				})
				this.value1 = ''
				this.value2 = ''
			},
			ChangePages(val){
				this.page_items = this.items.slice((val-1)*9,val*9)				
			},
			handleCurrentChange(val){
				console.log(val,this.pages)
				this.pages = val
				this.ChangePages(val)
				
			},
			goEditSST(index){
				let id = this.page_items[index].id
				this.$router.push('/home/editsst/'+id)
			},
			delSST(index){
				let id = this.page_items[index].id
				this.$axios.get('/del/sst/' + id).then((res)=>{
					if(res.data == 1){
						this.$message.success('删除香料二级分类成功！')
						this.$axios.get('/manage/sst').then((res)=>{
							this.items = res.data
							this.page_items = res.data.slice(0,9)
							this.pages = 1
						})
					}else{
						this.$message.error('删除香料二级分类失败！')
					}
				})
			}
		},
	}
</script>

<style>
	#ManageSST{
		width: 100%;
		height: 700px;
		background-color: white;
		padding: 10px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#ManageSST h3{
		margin: 10px 0;
	}
	#managesst-main{
		height: 30px;
	}
	#managesst-list{
		width: 100%;
		height: 500px;
		margin-top: 10px;
		margin-bottom: 20px;
		clear: both;
	}
	#managesst-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#managesst-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#managesst-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#managesst-list li:last-child{
		border-bottom: 0;
	}
	.managesst-list-header{
		width: 18%;
		text-align: left;
	}
	.managesst-list-first{
		width: 5%;
	}
	.managesst-list-second{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managesst-list-fith{
		width: 22%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managesst-list-header{
		float: left;	
	}
	.managesst-list-manage{
		width: 7%;
		color: #3A8EE6;
		float: left;
		cursor: pointer;
	}
	#mainsst-filter{
		float: right;
	}
	#mainsst-filter span{
		font-size: 13px;
	}
	#mainsst-filter button{
		margin-left: 10px;
	}
</style>
