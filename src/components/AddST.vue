<template>
	<div id="AddST">
		<h3>添加香料一级分类</h3>
		<div id="addst-main">		
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
			<el-button @click="RemoveCateGroyCover()" id="delete-st-cover-btu" v-else>删除封面</el-button>
			<p>选择主分类</p>
			<el-select v-model="value" placeholder="请选择">
			   <el-option
			     v-for="item in options"
			     :key="item.value"
			     :label="item.label"
			     :value="item.value"
			     :disabled="item.disabled">
			   </el-option>
			</el-select>
			<p>分类简介</p>
			<el-input 
				type="textarea"
				:autosize="{ minRows: 4, maxRows: 6}"
				placeholder="简介不易过长"
				v-model="introduction"
				>
			</el-input>
			<el-button @click="AddST()" id="add-st-btu" type="primary">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'AddST',
		data(){
			return{
				formMaxSize: 2, // 上传文件大小
				formFileList: [], // 显示上传文件
				uploadFormFileList: [],
				categroy_cover:'',
				name:'',
				introduction:'',
				options:[],
				value:''
			}
		},
		created(){
			this.$axios.get('/manage/maincategroy/list').then((res)=>{
				console.log(res)
				let options = []
				for(var i=0;i<res.data.length;i++){
					console.log(res.data[i].name)
					let nowjson = {"value":"", "lable":""}
					nowjson.value = res.data[i].name
					nowjson.lable = res.data[i].name
					options.push(nowjson)
					nowjson = {"value":"", "lable":""}
				}
				this.options = options
				console.log(this.options)
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
			AddST(){
				if(this.name === '' || this.introduction === '' || this.categroy_cover === ''|| this.value === ''){
					this.$message.warning('请先完善信息！')
				}else{
					this.$axios({
						method:'post',
						url:'/add/categroy',
						data:{
							"name":this.name,
							"cover":this.categroy_cover,
							"maincategroy": this.value,
							"introduction":this.introduction,
						}
					}).then((res)=>{
						console.log(res)
						if(res.data === 1){
							this.name = ''
							this.categroy_cover = ''
							this.value = ''
							this.introduction = ''
							this.$message.success('添加成功')					
							this.$router.push('/home/managest')
						}
					})
				}
			}
		}
	}
</script>

<style>
	#AddST{
		width: 100%;
		height: 670px;
		background-color: white;
		padding: 20px 40px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#addst-main{
		width: 80%;
	}
	#addst-main p{
		margin-top: 20px;
		margin-bottom: 10px;
		color: #409EFF;
	}
	#AddST h3{
		margin-top: 20px;
	}
	#uplaodcategroy_cover{
		width: 180px;
		height: 90px;
	}
	#delete-st-cover-btu{
		float: right;
	}
	#add-st-btu{
		margin-top:30px;
	}
</style>
