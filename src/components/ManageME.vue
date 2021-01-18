<template>
	<div id="ManageME">
		<div id="manageME-main">
			<h3>香料主要成分管理</h3>
			<div id="show-ME-add" @click="show3 = !show3">添加香料成分<i class="el-icon-circle-plus-outline el-icon--right"></i> </div>
			<el-collapse-transition>
			        <div v-show="show3">
			          <div class="transition-box">
						
						<el-input v-model="MEname" size="mini" id="addME-item-first"></el-input>
						<el-button @click="addME()" type='success' size="mini" id="addME-item-second">添加</el-button>
						<el-button @click="cancelAddME()" type='primary' size="mini">取消</el-button>
					  </div>
			        </div>
			      </el-collapse-transition>
			<div id="manageME-list">
				<ul>
					<li id="manageME-list-header">
						<div class="manageME-list-header manageME-list-first">序号</div>
						<div class="manageME-list-header manageME-list-third">成分名称</div>
						<div class="manageME-list-header">管理</div>
					</li>
					<li v-for="(item,index) in pageitems" class="manageME-list-item">
						<div class="manageME-list-header manageME-list-first">
							{{index + 1}}
						</div>
						<el-input size="mini" v-model="item.name" :disabled="disabled" class="manageME-list-header manageME-list-third"></el-input>
						<div class="manageME-list-manage">
							<el-button @click="startEdit(index)" v-show="!show2" type="primary" size="mini">编辑</el-button>
							<el-button @click="endEdit(index)" v-show="show2" type="primary" size="mini">提交</el-button>
						</div>
						<div class="manageME-list-manage">
							<el-popconfirm
							 @confirm="delME(index)"
							  title="这是一段内容确定删除吗？"
							>
							  <el-button type="danger" size="mini" slot="reference">删除</el-button>
							</el-popconfirm>
						</div>
					</li>
				</ul>
			</div>
					<el-pagination
					v-if="items.length>8"
					  layout="prev, pager, next"
					  :total="items.length"
					  :current-page="pages"
					  :page-size= 8
					  @current-change='handleCurrentChange'
					  >			  
					</el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		name:'ManageME',
		data(){
			return{
				show2:false,
				show3:false,
				MEname:'',
				items:[],
				pageitems:[],
				disabled:true,
			}
		},
		created(){
			this.$axios.get('/get/mainelementlist').then((res)=>{
				console.log(res)
				this.items = res.data
				this.pageitems = res.data.slice(0,8)
			})
		},
		methods:{
			cancelAddME(){
				this.MEname = ''
				this.show3 = false
			},
			addME(){
				if(this.MEname!== ''){
					this.$axios({
						method:'post',
						url:'/add/mainelement',
						data:{
							"name":this.MEname
						}
					}).then((res)=>{
						if(res.data===1){
							this.$message.success('添加成分信息成功')
							this.MEname = ''
							this.$axios.get('/get/mainelementlist').then((res)=>{
								console.log(res)
								this.items = res.data
								this.pageitems = res.data.slice(0,8)
							})
						}else{
							this.$message.error('添加成分失败')
						}
					})
				}else{
					this.$message.warning('请先完善信息')
				}	
			},
			startEdit(index){
				this.show2 = true
				this.disabled = false
				
			},
			endEdit(index){
				if(this.name==''){
					this.$message.warning('请先完善信息')
				}else{
				let id = this.pageitems[index].id
				let name = this.pageitems[index].name
				this.$axios({
					method:'post',
					url:'/edit/mainelement',
					data:{
						"id":id,
						"name":name,
					}
				}).then((res)=>{
					if(res.data===1){
						this.$axios.get('/get/mainelementlist').then((res)=>{
							console.log(res)
							this.items = res.data
							this.pageitems = res.data.slice(0,8)
						})
					    this.$message.success('修改成分信息成功')
					}else{
						this.$message.error('修改成分信息失败')
					}
				})
			}	
				this.show2 = false
				this.disabled = true
			},
			delME(index){
				let id = this.pageitems[index].id
				this.$axios.get('/del/mainelement/' + id).then((res)=>{
					if(res.data===1){
						this.$message.success('删除成分成功')
						this.$axios.get('/get/mainelementlist').then((res)=>{
							console.log(res)
							this.items = res.data
							this.pageitems = res.data.slice(0,8)
						})
					}else{
						this.$message.error('删除成分失败')
					}
				})
				
			},
			ChangePages(val){
				this.pageitems = this.items.slice((val-1)*8,val*8)				
			},
			handleCurrentChange(val){
				console.log(val,this.pages)
				this.pages = val
				this.ChangePages(val)
			},
		}
	}
</script>

<style>
	#ManageME{
		width: 100%;
		height: 700px;
		background-color: white;
		padding: 20px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#manageME-main h3{
		margin: 10px 0;
	}
	#show-ME-add{
		cursor: pointer;
	}
	#manageME-list{
		width: 100%;
		height: 450px;
		margin:10px 0;
	}
	#manageME-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#manageME-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#manageME-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#manageME-list li:last-child{
		border-bottom: 0;
	}
	.manageME-list-header{
		width: 30%;
		text-align: left;
	}
	.manageME-list-first{
		width: 10%;
	}
	.manageME-list-third{
		width: 60%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.manageME-list-header{
		float: left;	
	}
	.manageME-list-manage{
		width: 9%;
		color: #3A8EE6;
		float: left;
		cursor: pointer;
	}
	.transition-box {
	    margin-bottom: 10px;
	    width: 80%;
	    height: 60px;
	    box-sizing: border-box;
	    margin-right: 20px;
	  }
	#addME-item-first{
		float: left;
		width: 80%;
	}
	
	#addME-item-second{
		float: left;
	}
</style>
