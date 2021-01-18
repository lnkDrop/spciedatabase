<template>
	<div id="EditMainST">
		<h3>编辑香料主分类</h3>
		<div id="editmainst-main">		
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
			<el-button @click="RemoveCateGroyCover()" id="delete-mainst-cover-btu" v-else>删除封面</el-button>
			<p>分类简介</p>
			<el-input 
				type="textarea"
				:autosize="{ minRows: 4, maxRows: 6}"
				placeholder="简介不易过长"
				v-model="introduction"
				>
			</el-input>
			<el-button @click="EditMainST()" id="edit-mainst-btu" type="primary">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'EditMainST',
		data(){
			return{
				id:this.$route.params.mainst_id,
				formMaxSize: 2, // 上传文件大小
				formFileList: [], // 显示上传文件
				uploadFormFileList: [],
				categroy_cover:'',
				name:'',
				introduction:'',
			}
		},
		created(){
			this.$axios.get('/editget/maincategroy/' + this.id).then((res)=>{
				this.name = res.data.name
				this.categroy_cover = res.data.cover
				this.introduction = res.data.introduction
			})
		},
		methods:{
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
			EditMainST(){
				if(this.name === '' || this.introduction === '' || this.categroy_cover === ''){
					this.$message.warning('请先完善信息！')
				}else{
					this.$axios({
						method:'post',
						url:'/editup/maincategroy',
						data:{
							"id":this.id,
							"name":this.name,
							"cover":this.categroy_cover,
							"introduction":this.introduction,
						}
					}).then((res)=>{
						console.log(res)
						if(res.data === "1"){
							this.name = ''
							this.categroy_cover = ''
							this.introduction = ''
							this.$message.success('更新成功')					
							this.$router.push('/home/managemainst')
						}
					})
				}
			}
		},
		
	}
</script>

<style>
	#EditMainST{
		width: 100%;
		height: 650px;
		background-color: white;
		padding: 20px 40px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#editmainst-main{
		width: 80%;
	}
	#editmainst-main p{
		margin-top: 20px;
		margin-bottom: 10px;
		color: #409EFF;
	}
	#EditMainST h3{
		margin-top: 20px;
	}
	#uplaodcategroy_cover{
		width: 180px;
		height: 90px;
	}
	#delete-mainst-cover-btu{
		float: right;
	}
	#edit-mainst-btu{
		margin-top:30px;
	}
</style>
