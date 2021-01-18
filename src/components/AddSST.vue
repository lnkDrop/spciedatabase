<template>
	<div id="AddSST">
		<h3>添加香料二级分类</h3>
		<div id="addsst-main">		
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
			<el-select v-model="value_mainst" @change="getSTList()" placeholder="请选择">
			   <el-option
			     v-for="item in options_mainst"
			     :key="item.value_mainst"
			     :label="item.label"
			     :value="item.value_mainst"
			     :disabled="item.disabled">
			   </el-option>
			</el-select>
			<div v-if="value_mainst !==''">
				<p>选择一级分类</p>
				<el-select v-model="value_st" placeholder="请选择">
				   <el-option
					 v-for="item in options_st"
					 :key="item.value_st"
					 :label="item.label"
					 :value="item.value_st"
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
			<el-button @click="addSST()" id="add-sst-btu" type="primary">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'AddSST',
		data(){
			return{
				formMaxSize: 2, // 上传文件大小
				formFileList: [], // 显示上传文件
				uploadFormFileList: [],
				categroy_cover:'',
				name:'',
				introduction:'',
				options_mainst:[],
				value_mainst:'',
				options_st:[],
				value_st:'',
			}
		},
		created() {
			this.$axios.get('/manage/maincategroy/list').then((res)=>{
				let options = []
				for(var i=0;i<res.data.length;i++){
					console.log(res.data[i].name)
					let nowjson = {"value_mainst":"", "lable":""}
					nowjson.value_mainst = res.data[i].name
					nowjson.lable_mainst = res.data[i].name
					options.push(nowjson)
					nowjson = {"value_mainst":"", "lable":""}
				}
				this.options_mainst = options
				console.log(this.options)
			})
			
		},
		methods:{
			getSTList(){
				this.$axios.get('/get/stlist/'+this.value_mainst).then((res)=>{
					let options = []
					for(var i=0;i<res.data.length;i++){
						console.log(res.data[i].name)
						let nowjson = {"value_st":"", "lable":""}
						nowjson.value_st = res.data[i].name
						nowjson.lable_st = res.data[i].name
						options.push(nowjson)
						nowjson = {"value_st":"", "lable":""}
					}
					this.options_st = options
					console.log(this.options)
				})
			},
			addSST(){
				if(this.name === '' || this.introduction === '' || this.categroy_cover === ''|| this.value_mainst === ''||this.value_st===''){
					this.$message.warning('请先完善信息！')
				}else{
					this.$axios({
						method:'post',
						url:'/add/sst',
						data:{
							"name":this.name,
							"cover":this.categroy_cover,
							"introduction":this.introduction,
							"maincategroy":this.value_mainst,
							"categroy":this.value_st,
						}
					}).then((res)=>{
						if(res.data ==="1"){
							this.name = ''
							this.cover = ''
							this.introduction = ''
							this.value_mainst = ''
							this.value_st = ''
							this.$message.success('添加香料二级分类成功')
							this.$router.push('/home/managesst')
							
						}else{
							this.$message.error('添加香料二级分类失败')
						}
					})
				}
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
		}
	}
</script>

<style>
	#AddSST{
		width: 100%;
		height: 770px;
		background-color: white;
		padding: 20px 40px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#addsst-main{
		width: 80%;
	}
	#addsst-main p{
		margin-top: 20px;
		margin-bottom: 10px;
		color: #409EFF;
	}
	#AddSST h3{
		margin-top: 20px;
	}
	#uplaodcategroy_cover{
		width: 180px;
		height: 90px;
	}
	#delete-sst-cover-btu{
		float: right;
	}
	#add-sst-btu{
		margin-top:30px;
	}
</style>
