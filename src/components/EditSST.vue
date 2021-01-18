<template>
	<div id="EditSST">
		<h3>编辑香料二级分类</h3>
		<div id="editsst-main">		
			<p>分类名称</p>
			<el-input v-model="name"></el-input>
			<p>分类封面</p>
			<img v-if="categroy_cover !== ''" id="uplaodcategroy_cover" :src="this.categroy_cover" />
			<el-upload v-if="categroy_cover == ''" class="upload-demo" action
			    :file-list="formFileList" 
			    :http-request="handleUploadForm" 
			    multiple
				accept=".jpg,.png,.jpeg"
			    :before-upload="beforeUploadForm">
			    <el-button type="">上传文件</el-button>
			    <span slot="tip" class="el-upload__tip" style="margin: 0 10px;">只能上传jpg/jpeg/png文件，且不超过{{formMaxSize}}M</span>
			</el-upload>
			<el-button @click="RemoveCateGroyCover()" id="delete-sst-cover-btu" v-else>删除封面</el-button>
			<p>选择主分类</p>
			<el-select v-model="value1" @change="getSST()" placeholder="请选择">
			   <el-option
			     v-for="item in options1"
			     :key="item.value1"
			     :label="item.label"
			     :value="item.value1"
			     :disabled="item.disabled">
			   </el-option>
			</el-select>
			<div v-if="value1 !==''">
				<p>选择一级分类</p>
				<el-select v-model="value2" placeholder="请选择">
				   <el-option
					 v-for="item in options2"
					 :key="item.value2"
					 :label="item.label"
					 :value="item.value2"
					 :disabled="item.disabled">
				   </el-option>
				</el-select>
			</div>
			<p>分类简介</p>
			<el-input 
				type="textarea"
				:autosize="{ minRows: 4, maxRows: 6}"
				placeholder="简介不易过长"
				v-model="introduction"
				>
			</el-input>
			<el-button @click="upSSTEdit()" id="edit-sst-btu" type="primary">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'EditSST',
		data(){
			return{
				id:this.$route.params.sst_id,
				formMaxSize: 2, // 上传文件大小
				formFileList: [], // 显示上传文件
				uploadFormFileList: [],
				categroy_cover:'',
				name:'',
				introduction:'',
				options1:[],				
				value1:'',
				options2:[],			
				value2:'',
			}
		},
		created() {
			this.$axios.get('/sst/detail/'+ this.id).then((res)=>{
				this.name = res.data.name
				this.categroy_cover = res.data.cover
				this.value1 = res.data.maincategroy
				this.value2 = res.data.categroy
				this.introduction = res.data.introduction
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
				})
			})
		},
		methods:{
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
					this.value2 = options[0].value2
				})
			},
			beforeUploadForm (file) {
			   // 验证文件大小
			   if (file.size / 2048 / 2048 > this.formMaxSize) {
			    this.$message({
			     message: `上传文件大小不能超过${this.formMaxSize}M!`,
			     type: 'warning'
			    })
			    return false
			   } 
			},
			  
			// 上传文件
			handleUploadForm (param) {
			 let thiz = this
			 let categroy_cover= new FormData()
			 categroy_cover.append('categroy_cover', param.file)
			 let loading = thiz.$loading({
			  lock: true,
			  text: '上传中，请稍候...',
			  spinner: 'el-icon-loading',
			  background: 'rgba(0, 0, 0, 0.7)'
			 })
			  thiz.$axios.post('/upload/categroycover', categroy_cover).then(({data}) => {
				 console.log(data)
			 		if(data.code === 'ok'){
			 			thiz.formFileList = []
			 			thiz.uploadFormFileList = []
			 			thiz.$message.success('上传封面成功')
						console.log(data.img_url)
						thiz.categroy_cover = data.img_url
			 		}else{
			 			
			 			thiz.$message('上传封面失败')
			 		}
			 		loading.close()
			  }).catch((ree)=>{
			 				   console.log(ree)
			  })
			 },
			RemoveCateGroyCover(){
				this.$axios({
					method:'post',
					url:'/delete/categroycover',
					data:{
						"categroy_cover":this.categroy_cover
					}
				}).then((res)=>{
					console.log(res)
					if(res.data === '1'){
						this.categroy_cover = ''
					}
				})
			},
			upSSTEdit(){
				if(this.name===''||this.categroy_cover===''||this.introduction===''||this.value1===''||this.value2===''){
					this.$message.warning('请先完善信息')
				}else{
					this.$axios({
						method:'post',
						url:'/up/sst/detail',
						data:{
							"id":this.id,
							"name":this.name,
							"cover":this.categroy_cover,
							"introduction":this.introduction,
							"maincategroy":this.value1,
							"categroy":this.value2
						}
					}).then((res)=>{
						if(res.data==='1'){
							this.name = ''
							this.categroy_cover = ''
							this.introduction = ''
							this.value1 = ''
							this.value2 = ''
							this.$message.success('编辑成功！')
							this.$router.push('/home/managesst')
						}else{
							this.$message.error('编辑失败')
						}
					})
				}
			}
		}
		
	}
</script>

<style>
	#EditSST{
		width: 100%;
		height: 770px;
		background-color: white;
		padding: 20px 40px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#editsst-main{
		width: 80%;
	}
	#editsst-main p{
		margin-top: 20px;
		margin-bottom: 10px;
		color: #409EFF;
	}
	#EditSST h3{
		margin-top: 20px;
	}
	#uplaodcategroy_cover{
		width: 180px;
		height: 90px;
	}
	#delete-sst-cover-btu{
		float: right;
	}
	#edit-sst-btu{
		margin-top:30px;
	}
</style>
