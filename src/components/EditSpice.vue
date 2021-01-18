<template>
	<div id="EditSpice">
		<h3>编辑香料信息</h3>
		<p>选定分类</p>
		<div id="select-spice-main">	
			<div class="select-spice-categroy">
				<el-select @change="getST()" size="mini" v-model="value1" placeholder="香料主分类">
				    <el-option	
				      v-for="item in options1"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value1">
				    </el-option>
				</el-select>
			</div>
			<div class="select-spice-categroy">
				<el-select @change="getSST" size="mini" v-model="value2" placeholder="香料一级分类">
				    <el-option	
				      v-for="item in options2"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value2">
				    </el-option>
				</el-select>
			</div>
			<div class="select-spice-categroy">
				<el-select @change="" size="mini" v-model="value3" placeholder="香料二级分类">
				    <el-option	
				      v-for="item in options3"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value3">
				    </el-option>
				</el-select>
			</div>
		</div>
		<p>中文名称</p>
		<div>
			<el-input size="mini" v-model="name"></el-input>
		</div>
		<p>英文名称</p>
		<div>
			<el-input size="mini" v-model="english_name"></el-input>
		</div>
		<p>产地</p>
		<div>		
			<el-select size="mini" v-model="valuepop" multiple placeholder="请选择">
			    <el-option
			      v-for="item in optionspop"
			      :key="item.value"
			      :label="item.label"
			      :value="item.valuepop">
			    </el-option>
			  </el-select>
		</div>
		<p>用途</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="use"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>主要成分</p>
		<div id="add-main-element">
			<ul>
				<li>
					<div>
						<p>成分名称：</p>
						<el-select size="mini" v-model="valueelement">
							<el-option
							  v-for="item in optionselement"
							  :key="item.value"
							  :label="item.label"
							  :value="item.valueelement">
							</el-option>
						</el-select>
					</div>
					<div>成分占比(%)：<el-input v-model="main_element_proportion" size="mini"></el-input></div>
					<div id="add-main-element-btu"><el-button @click="addMainElement" type="primary" size="mini">添加</el-button></div>
				</li>
			</ul>
			<ul id="add-main-element-col">
				<li class="manage-mainelement-list" v-for="(item,index) in main_elements">
					<div class="manage-mainelement-list-item">成分名称：<span>{{item.name}}</span></div>
					<div class="manage-mainelement-list-item">成分占比：<span>{{item.proportion}}%</span></div>
					<div class="manage-mainelement-list-item">
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="delMainELement(index)" round></el-button>
					</div>	
				</li>
			</ul>
		</div>
		<p>制备方法</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="creation_method"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>性状</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="character"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>管理状况</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model=" management_situation"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>感官特征</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="sensory_charact"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>物理特性</p>
		<div id="add-main-element">
			<ul>
				<li>
					<div>
						<p>物理特征名称：</p>
						<el-select size="mini" @focus="getPhyPor()" v-model="valuephypor">
							<el-option
							  v-for="item in optionsphypor"
							  :key="item.value"
							  :label="item.label"
							  :value="item.valuephypor">
							</el-option>
						</el-select>
					</div>
					<div>常数：<el-input v-model="phypor_constant" size="mini"></el-input></div>
					<div>描述：<el-input v-model="phypor_describe" size="mini"></el-input></div>
					<div>最小值：<el-input v-model="phypor_min" size="mini"></el-input></div>
					<div>最大值：<el-input v-model="phypor_max" size="mini"></el-input></div>
					<div id="add-main-element-btu"><el-button @click="addPhyPor()" type="primary" size="mini">添加</el-button></div>
				</li>
			</ul>
			<ul id="add-main-element-col">
				<li class="manage-mainelement-list" v-for="(item,index) in phypors">
					<div class="manage-mainelement-list-item">特征名称：<span>{{item.name}}</span></div>
					<div v-if="item.constant!==''&&item.constant!==null" class="manage-mainelement-list-item">常数：<span>{{item.constant}}</span></div>
					<div v-if="item.describe!==''&&item.describe!==null" class="manage-mainelement-list-item">描述：<span>{{item.describe}}</span></div>
					<div v-if="item.minvalue!==''&&item.minvalue!==null" class="manage-mainelement-list-item">最小值：<span>{{item.minvalue}}</span></div>
					<div v-if="item.maxvalue!==''&&item.maxvalue!==null" class="manage-mainelement-list-item">最大值：<span>{{item.maxvalue}}</span></div>
					<div class="manage-mainelement-list-item">
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="delPhyPor(index)" round></el-button>
					</div>	
				</li>
			</ul>
		</div>
		<p>使用方法</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="use_method"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>作用描述</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="description"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>关联产品</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="related_products"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<p>常用配方</p>
		<div>
			<el-input 
			  type="textarea"
			  placeholder="请输入内容"
			  v-model="Commonly_used_formula"
			  maxlength="100"
			  :autosize="{ minRows: 2, maxRows: 4}"
			  size="mini"
			  show-word-limit
			></el-input>
		</div>
		<div id="spice-do-some">
			<el-button @click="EditSpice()" type="primary">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'EditSpice',
		data(){
			return{
				spice_id:this.$route.params.spice_id,
				value1:'',
				value2:'',
				value3:'',
				valuepop:[],
				valueelement:'',
				valuephypor:'',
				options1:[],
				options2:[],
				options3:[],
				optionspop:[],
				optionselement:[],
				optionsphypor:[],
				name:'',
				english_name:'',
				use:'',
				main_elements:[],
				main_element_proportion:'',
				phypors:[],
				phypor_describe:'',
				phypor_constant:'',
				phypor_min:'',
				phypor_max:'',
				creation_method:'',
				character:'',
				management_situation:'',
				sensory_charact:'',
				use_method:'',
				description:'',
				related_products:'',
				Commonly_used_formula:'',
			}
		},
		created(){
			this.$axios.get('/manage/maincategroy/list').then((res1)=>{
				console.log(res1)
				let options = []
				for(var i=0;i<res1.data.length;i++){
					console.log(res1.data[i].name)
					let nowjson = {"value":"", "lable":""}
					nowjson.value1 = res1.data[i].name
					nowjson.lable1 = res1.data[i].name
					options.push(nowjson)
					nowjson = {"value":"", "lable":""}
				}
				this.options1 = options
				this.$axios.get('/get/poplist').then((res2)=>{
					console.log(res2)
					let options = []
					for(var i=0;i<res2.data.length;i++){
						console.log(res2.data[i].name)
						let nowjson = {"valuepop":"", "lablepop":""}
						nowjson.valuepop = res2.data[i].name
						nowjson.lablepop = res2.data[i].name
						options.push(nowjson)
						nowjson = {"valuepop":"", "lablepop":""}
					}
					this.optionspop = options
					this.$axios.get('/get/mainelementlist').then((res3)=>{
						let options = []
						for(var i=0;i<res3.data.length;i++){
							console.log(res3.data[i].name)
							let nowjson = {"valueelement ":"", "lableelement ":""}
							nowjson.valueelement  = res3.data[i].name
							nowjson.lableelement  = res3.data[i].name
							options.push(nowjson)
							nowjson = {"valueelement ":"", "lableelement ":""}
						}
						this.optionselement = options
						this.$axios.get('/spice/detail/' + this.spice_id).then((res)=>{
							console.log(res)
							this.value1 = res.data.maincategroy
							this.value2 = res.data.categroy
							this.value3 = res.data.secondary_categroy
							this.name = res.data.name
							this.english_name = res.data.english_name
							this.use = res.data.use
							this.use_method = res.data.use_method
							this.description = res.data.description
							this.related_products = res.data.related_products
							this.Commonly_used_formula = res.data.Commonly_used_formula
							this.sensory_charact = res.data.sensory_charact
							this.management_situation = res.data.management_situation
							this.character = res.data.character
							this.creation_method = res.data.creation_method
							this.valuepop = res.data.pops
							this.main_elements = res.data.main_element
							this.phypors = res.data.phypor
							for(var s=0;s<this.phypors.length;s++){
								if(this.phypors[s]["minvalue"]===null){
									this.phypors[s]["minvalue"] = ''
								}
								if(this.phypors[s]["maxvalue"]===null){
									this.phypors[s]["maxvalue"] = ''
								}
								if(this.phypors[s]["constant"]===null){
									this.phypors[s]["constant"] = ''
								}
							}					
						})
					})
				})
			})
			
		},
		methods:{
			getST(){
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
			getSST(){
				this.$axios({
					method:'post',
					url:'/manage/sst',
					data:{
						"categroy":this.value2
					}
				}).then((res3)=>{
					console.log(res3)
					let options = []
					for(var i=0;i<res3.data.length;i++){
						console.log(res3.data[i].name)
						let nowjson = {"value":"", "lable":""}
						nowjson.value3 = res3.data[i].name
						nowjson.lable3 = res3.data[i].name
						options.push(nowjson)
						nowjson = {"value":"", "lable":""}
					}
					this.options3 = options
				})
			},
			addMainElement(){
				if(this.valueelement===''||this.main_element_proportion===''){
					this.$message.warning('请先完善成分信息')
				}else{
					let main_element_json = {"name":"","proportion":""}
					main_element_json.name = this.valueelement
					main_element_json.proportion = this.main_element_proportion
					this.main_elements.push(main_element_json)
					main_element_json = {"name":"","proportion":""}
					this.valueelement = ''
					this.main_element_proportion = ''
				}
			},
			delMainELement(index){
			    let mm = this.main_elements.splice(index,1)
				console.log(mm)
			},
			getPhyPor(){
				this.$axios.get('/get/phyporlist').then((res)=>{
					console.log(res.data)
					let options = []
					for(var i=0;i<res.data.length;i++){
						console.log(res.data[i].name)
						let nowjson = {"valuephypor":"", "lablephypor":""}
						nowjson.valuephypor = res.data[i].name
						nowjson.lablephypor = res.data[i].name
						options.push(nowjson)
						nowjson = {"valuephypor":"", "lablephypor":""}
					}
					this.optionsphypor = options
				})
			},
			addPhyPor(){
				if(this.valuephypor===''){
					this.$message.warning('请先完善成分信息')
				}else{
					let phypor_json = {"name":"","constant":"","describe":"","minvalue":"","maxvalue":""}		
					phypor_json.name = this.valuephypor
					phypor_json.constant = this.phypor_constant
					phypor_json.describe = this.phypor_describe
					phypor_json.minvalue = this.phypor_min
					phypor_json.maxvalue = this.phypor_max
					this.phypors.push(phypor_json)
					phypor_json = {"name":"","constant":"","describe":"","minvalue":"","maxvalue":""}
					this.valuephypor = ''
					this.phypor_constant = ''
					this.phypor_describe = ''
					this.phypor_min = ''
					this.phypor_max = ''
				}
			},
			delPhyPor(index){
			    let mm = this.phypors.splice(index,1)
				console.log(mm)
			},
			
			EditSpice(){
				if(this.value1===""||this.value2===""||this.value3===""||this.name===""){
					this.$message.warning('请先完善信息')
				}else{
					console.log(this.main_elements)
					console.log(this.phypors)
					console.log(typeof this.spice_id)				
					this.$axios({
						method:'post',
						url:'/edit/spice',
						data:{
							"id":this.spice_id,
							"maincategroy":this.value1,
							"categroy":this.value2,
							"secondarycategroy":this.value3,
							"name":this.name,
							"use":this.use,
							"use_method":this.use_method,
							"description":this.description,
							"english_name":this.english_name,
							"creation_method":this.creation_method,
							"character":this.character,
							"management_situation":this.management_situation,
							"sensory_charact":this.sensory_charact,
							"related_products":this.related_products,
							"Commonly_used_formula":this.Commonly_used_formula,
							"pops":this.ToJson(this.valuepop),
							"main_elements":this.ToJson(this.main_elements),
							"physical_property":this.ToJson(this.phypors),
						}
					}).then((res)=>{
						if(res.data === 1){
							this.$message.success('编辑香料信息成功')
							this.$router.push('/home/managespice')
						}else{
							this.$message.error('编辑香料信息失败')
							this.$router.push('/home/managespice')
						}
					})
				}
			}
			 
		}
	}
</script>

<style>
	#EditSpice{
		width: 100%;
		height: auto;
		background-color: white;
		padding: 10px 30px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
	}
	#EditSpice p{
		color: #409EFF;
		margin: 8px;
	}
	#select-spice-main{
		width: 100%;
		height: 45px;
		display: flex;
		flex-direction: row;
	}
	.select-spice-categroy{
		margin-left: 10px;
	}
	#add-main-element{
		list-style: none;
	}
	#add-main-element-btu{
		margin-top: 20px;
		margin-left: 5px;
	}
	#add-main-element li{
		display: flex;
		flex-direction: row;
	}
	#add-main-element p{
		margin: 0;
		color: #000000;
	}
	.manage-mainelement-list{
		display: flex;
		flex-direction: row;
		height: 36px;
		padding: 3px;
		align-items: center;
		border: #ecf0f1 1px solid;
		margin-top: 3px;
		border-radius: 2px;
	}
	.manage-mainelement-list-item{
		margin-left: 10px;
	}
	#spice-do-some{
		margin-top: 30px;
		margin-bottom: 50px;
	}
	
</style>
