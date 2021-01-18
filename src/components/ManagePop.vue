<template>
	<div id="ManagePop">
		<div id="managepop-main">
			<h3>香料产地管理</h3>
			<div id="show-pop-add" @click="show3 = !show3">添加香料产地<i class="el-icon-circle-plus-outline el-icon--right"></i> </div>
			<el-collapse-transition>
			        <div v-show="show3">
			          <div class="transition-box">
						
						<el-input v-model="popname" size="mini" id="addpop-item-first"></el-input>
						<el-button @click="addPop()" type='success' size="mini" id="addpop-item-second">添加</el-button>
						<el-button @click="cancelAddPop()" type='primary' size="mini">取消</el-button>
					  </div>
			        </div>
			      </el-collapse-transition>
			<div id="managepop-list">
				<ul>
					<li id="managepop-list-header">
						<div class="managepop-list-header managepop-list-first">序号</div>
						<div class="managepop-list-header managepop-list-third">产地名称</div>
						<div class="managepop-list-header">管理</div>
					</li>
					<li v-for="(item,index) in pageitems" class="managepop-list-item">
						<div class="managepop-list-header managepop-list-first">
							{{index + 1}}
						</div>
						<el-input size="mini" v-model="item.name" :disabled="disabled" class="managepop-list-header managepop-list-third"></el-input>
						<div class="managepop-list-manage">
							<el-button @click="startEdit(index)" v-show="!show2" type="primary" size="mini">编辑</el-button>
							<el-button @click="endEdit(index)" v-show="show2" type="primary" size="mini">提交</el-button>
						</div>
						<div class="managepop-list-manage">
							<el-popconfirm
							 @confirm="delPop(index)"
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
		name:'ManagePop',
		data(){
			return{
				show2:false,
				show3:false,
				popname:'',
				items:[],
				pageitems:[],
				disabled:true,
			}
		},
		created(){
			this.$axios.get('/get/poplist').then((res)=>{
				console.log(res)
				this.items = res.data
				this.pageitems = res.data.slice(0,8)
			})
		},
		methods:{
			cancelAddPop(){
				this.popname = ''
				this.show3 = false
			},
			addPop(){
				if(this.popname!== ''){
					this.$axios({
						method:'post',
						url:'/add/pop',
						data:{
							"name":this.popname
						}
					}).then((res)=>{
						if(res.data===1){
							this.$message.success('添加产地信息成功')
							this.popname = ''
							this.$axios.get('/get/poplist').then((res)=>{
								console.log(res)
								this.items = res.data
								this.pageitems = res.data.slice(0,8)
							})
						}else{
							this.$message.error('添加产地失败')
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
					url:'/edit/pop',
					data:{
						"id":id,
						"name":name,
					}
				}).then((res)=>{
					if(res.data===1){
						this.$axios.get('/get/poplist').then((res)=>{
							console.log(res)
							this.items = res.data
							this.pageitems = res.data.slice(0,8)
						})
					    this.$message.success('修改产地信息成功')
					}else{
						this.$message.error('修改产地信息失败')
					}
				})
			}	
				this.show2 = false
				this.disabled = true
			},
			delPop(index){
				let id = this.pageitems[index].id
				this.$axios.get('/del/pop/' + id).then((res)=>{
					if(res.data===1){
						this.$message.success('删除产地成功')
						this.$axios.get('/get/poplist').then((res)=>{
							console.log(res)
							this.items = res.data
							this.pageitems = res.data.slice(0,8)
						})
					}else{
						this.$message.error('删除产地失败')
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
	#ManagePop{
		width: 100%;
		height: 700px;
		background-color: white;
		padding: 20px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#managepop-main h3{
		margin: 10px 0;
	}
	#show-pop-add{
		cursor: pointer;
	}
	#managepop-list{
		width: 100%;
		height: 450px;
		margin:10px 0;
	}
	#managepop-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#managepop-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#managepop-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#managepop-list li:last-child{
		border-bottom: 0;
	}
	.managepop-list-header{
		width: 30%;
		text-align: left;
	}
	.managepop-list-first{
		width: 10%;
	}
	.managepop-list-third{
		width: 60%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managepop-list-header{
		float: left;	
	}
	.managepop-list-manage{
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
	#addpop-item-first{
		float: left;
		width: 80%;
	}

	#addpop-item-second{
		float: left;
	}
</style>
