<template>
	<div id="ManagePhyPor">
		<div id="managephypor-main">
			<h3>物理特性管理</h3>
			<div id="show-phypor-add" @click="show3 = !show3">添加物理特性<i class="el-icon-circle-plus-outline el-icon--right"></i> </div>
			<el-collapse-transition>
			        <div v-show="show3">
			          <div class="transition-box">					
						<el-input v-model="phyporname" placeholder="输入特性名称" size="mini" id="addphypor-item-first"></el-input>
						<el-input v-model="phyporunit" placeholder="输入特性计量单位" size="mini" id="addphypor-item-two"></el-input>
						<el-button @click="addphypor()" type='success' size="mini" id="addphypor-item-second">添加</el-button>
						<el-button @click="cancelAddphypor()" type='primary' size="mini">取消</el-button>
					  </div>
			        </div>
			      </el-collapse-transition>
			<div id="managephypor-list">
				<ul>
					<li id="managephypor-list-header">
						<div class="managephypor-list-header managephypor-list-first">序号</div>
						<div class="managephypor-list-header managephypor-list-third">性质名称</div>
						<div class="managephypor-list-header managephypor-list-third">计量单位</div>
						<div class="managephypor-list-header">管理</div>
					</li>
					<li v-for="(item,index) in pageitems" class="managephypor-list-item">
						<div class="managephypor-list-header managephypor-list-first">
							{{index + 1}}
						</div>
						<el-input size="mini" v-model="item.name" :disabled="disabled" class="managephypor-list-header managephypor-list-third"></el-input>
						<el-input size="mini" v-model="item.unit" :disabled="disabled" class="managephypor-list-header managephypor-list-third"></el-input>
						<div class="managephypor-list-manage">
							<el-button @click="startEdit(index)" v-show="!show2" type="primary" size="mini">编辑</el-button>
							<el-button @click="endEdit(index)" v-show="show2" type="primary" size="mini">提交</el-button>
						</div>
						<div class="managephypor-list-manage">
							<el-popconfirm
							 @confirm="delphypor(index)"
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
		name:'ManagePhyPor',
		data(){
			return{
				show2:false,
				show3:false,
				phyporname:'',
				phyporunit:'',
				items:[],
				pageitems:[],
				disabled:true,
			}		
		},
		created(){
			this.$axios.get('/get/phyporlist').then((res)=>{
				console.log(res)
				this.items = res.data
				this.pageitems = res.data.slice(0,8)
			})
		},
		methods:{
			cancelAddphypor(){
					this.phyporname = ''
					this.show3 = false
				},
				addphypor(){
					if(this.phyporname!== ''){
						this.$axios({
							method:'post',
							url:'/add/phypor',
							data:{
								"name":this.phyporname,
								"unit":this.phyporunit,
							}
						}).then((res)=>{
							if(res.data===1){
								this.$message.success('添加物理特性成功')
								this.phyporname = ''
								this.phyporunit = ''
								this.$axios.get('/get/phyporlist').then((res1)=>{
									console.log(res1)
									this.items = res1.data
									this.pageitems = res1.data.slice(0,8)
								})
							}else{
								this.$message.error('添加物理特性失败')
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
					let unit = this.pageitems[index].unit
					console.log(unit)
					this.$axios({
						method:'post',
						url:'/edit/phypor',
						data:{
							"id":id,
							"name":name,
							"unit":unit,
						}
					}).then((res)=>{
						if(res.data===1){
							this.$axios.get('/get/phyporlist').then((res)=>{
								console.log(res)
								this.items = res.data
								this.pageitems = res.data.slice(0,8)
							})
						    this.$message.success('修改物理特性成功')
						}else{
							this.$message.error('修改物理特性失败')
						}
					})
				}	
					this.show2 = false
					this.disabled = true
				},
				delphypor(index){
					let id = this.pageitems[index].id
					this.$axios.get('/del/phypor/' + id).then((res)=>{
						if(res.data===1){
							this.$message.success('删除物理特性成功')
							this.$axios.get('/get/phyporlist').then((res1)=>{
								console.log(res1)
								this.items = res1.data
								this.pageitems = res1.data.slice(0,8)
							})
						}else{
							this.$message.error('删除物理特性失败')
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
			
		},
	}
</script>

<style>
	#ManagePhyPor{
		width: 100%;
		height: 700px;
		background-color: white;
		padding: 20px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#managephypor-main h3{
		margin: 10px 0;
	}
	#show-phypor-add{
		cursor: pointer;
	}
	#managephypor-list{
		width: 100%;
		height: 450px;
		margin:10px 0;
	}
	#managephypor-list ul{
		list-style: none;
		width: 100%;
		border: #bdc3c7 solid 1px;
		border-radius: 3px;
	}
	#managephypor-list li{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: #bdc3c7 solid 1px;
		padding: 0 10px;
	}
	#managephypor-list li:nth-child(odd){
		background-color: #f1f2f6;
	}
	#managephypor-list li:last-child{
		border-bottom: 0;
	}
	.managephypor-list-header{
		width: 25%;
		text-align: left;
	}
	.managephypor-list-first{
		width: 10%;
	}
	.managephypor-list-third{
		width: 32%;
		padding-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.managephypor-list-header{
		float: left;	
	}
	.managephypor-list-manage{
		width: 9%;
		color: #3A8EE6;
		float: left;
		cursor: pointer;
	}
	.transition-box {
	    margin-bottom: 10px;
	    width: 80%;
	    height: 90px;
	    box-sizing: border-box;
	    margin-right: 20px;
	  }
	#addphypor-item-first{
		float: left;
		width: 80%;
	}
	#addphypor-item-two{
		float: left;
		width: 80%;
	}
	
	#addphypor-item-second{
		float: left;
	}
</style>
