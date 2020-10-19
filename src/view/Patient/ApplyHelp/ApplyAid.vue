<!-- 援助申请 -->
<template>
<div class='container bgf'>
    <van-steps :active="active" class="pt20 pl30 pr30 pb10 borBox">
		<van-step>信息提交</van-step>
		<van-step>资料审核<p v-if="active == 1" class="fz12 mt20" :class="{colore5:detail.status==2}">{{detail.status | filterStatus}}</p></van-step>
		<van-step>药房领药<p v-if="active == 2" class="fz12 mt20">{{detail.status | filterStatus}}</p></van-step>
    </van-steps>
	<van-divider />
	<main class="pl15 pr15 borBox" v-if='active < 2'>
		<template v-if='$route.query.giveTimes == 1'>	
			<div class="flex justs alic lh60">
				<span>上传身份证：</span>
				<span class="colorf3 flex alic" @click="isShowHelp = true;helpType = 'card'"><van-icon name="question" color="#F3665E" class="mr5"/>帮助说明</span>
			</div>
			<div class="flex justs">
				<p :class="['cardImg','boxImg','w100',form.cardFrontUrl.length>0?'flexImg':'',(detail.status==2&&detail.isOld==1) || detail.cardFrontAud==2 || ($route.query.giveId?false:true)?'':'noLook']" @click="activec = 'cardFrontUrl'">
					<!-- capture='camera' -->
					<van-uploader
					:max-count="2"
					:deletable='(detail.status==2&&detail.isOld==1) || detail.cardFrontAud==2 || ($route.query.giveId?false:true)?true:false'
					v-model="form.cardFrontUrl"
					:after-read="afterRead"
					upload-text='身份证'
					image-fit='fill'
					/>
					<!-- :disabled='(detail.status==2&&detail.isOld==1) || detail.cardFrontAud==2?false:true' -->
					<span class="show colore5 remark" v-if="detail.status==2 && detail.cardFrontAud==2">{{detail.cardFrontRemarks}}</span>
				</p>
			</div>
		</template>

		<div class="flex justs alic lh60">
			<span>上传发票：</span>
			<span class="colorf3 flex alic" @click="isShowHelp = true;helpType = 'invoice'"><van-icon name="question" color="#F3665E" class="mr5"/>帮助说明</span>
		</div>
		<div class="flex justs">
			<p :class="['invoiceImg','boxImg' ,'w100',(detail.status==2&&detail.isOld==1) || detail.invoiceOneAud==2 || ($route.query.giveId?false:true)?'':'noLook']" @click="activec = 'invoiceOneUrl'">
				<van-uploader
				:max-count="9"
				:deletable='(detail.status==2&&detail.isOld==1) || detail.invoiceOneAud==2 || ($route.query.giveId?false:true)?true:false'
				v-model="form.invoiceOneUrl"
				:after-read="afterRead"
				upload-text='购药发票'
				image-fit='fill'
				/>
				<!-- :disabled='(detail.status==2&&detail.isOld==1) || detail.invoiceOneAud!=2?false:true' -->
				<span class="show colore5" v-if="detail.status==2 && detail.invoiceOneAud==2">{{detail.invoiceOneRemarks}}</span>
			</p>
		</div>
		<div class="flex justs alic lh60">
			<span>上传医生处方：</span>
			<span class="colorf3 flex alic" @click="isShowHelp = true;helpType = 'prescription'"><van-icon name="question" color="#F3665E" class="mr5"/>帮助说明</span>
		</div>
		<p :class="['prescriptionImg','boxImg',(detail.status==2&&detail.isOld==1) || detail.prescriptionAud==2 || ($route.query.giveId?false:true)?'':'noLook']" @click="activec = 'prescriptionUrl'">
			<van-uploader
			:max-count="1"
			:deletable='(detail.status==2&&detail.isOld==1) || detail.prescriptionAud==2 || ($route.query.giveId?false:true)?true:false'
			v-model="form.prescriptionUrl"
			:after-read="afterRead"
			upload-text='医生处方意见'
			image-fit='fill'
			/>
			<!-- :disabled='(detail.status==2&&detail.isOld==1) || detail.prescriptionAud!=2?false:true' -->
			<span class="show colore5" v-if="detail.status==2 && detail.prescriptionAud==2">{{detail.prescriptionRemarks}}</span>
		</p>
		
		<div class="flex justs alic lh40">省市：</div>
		<van-field
			class="inp"
			v-model="provinces"
			@click="(detail.status==2&&detail.isOld==1) || ($route.query.giveId?false:true)?showProvinces():''"
			placeholder="请选择"
			readonly
		/>

		<div class="flex justs alic lh40">药房：</div>
		<van-field
			class="inp"
			v-model="form.pharmacyName"
			@click="(detail.status==2&&detail.isOld==1) || ($route.query.giveId?false:true)?showRoom():''"
			placeholder="请选择"
			readonly
		/>
		
		<div class="flex justs alic lh60">
			<span>是否代领：</span>
			<van-radio-group v-model="form.isTake" class="flex ml20" :disabled="(detail.status==2&&detail.isOld==1) || ($route.query.giveId?false:true)?false:true">
				<van-radio :name="0" class="flex">否</van-radio>
				<van-radio :name="1" class="flex ml24">是</van-radio>
			</van-radio-group>
			<span class="colorf3 flex alic" @click="isShowHelp = true;helpType = 'takeCard'"><van-icon name="question" color="#F3665E" class="mr5"/>帮助说明</span>
		</div>
		
		<template v-if="form.isTake == 1">
			<div class="flex justs alic mb10">代领人身份证：</div>
			<van-field class="inp" v-model="form.takeCardId" @input='cardRule' :readonly="(detail.status==2&&detail.isOld==1) || ($route.query.giveId?false:true)?false:true" clearable placeholder="请输入用户名" />
			<div class="flex justs alic lh60">上传代领人身份证：</div>
			<div class="flex justs">
				<p :class="['cardImg','boxImg','w100',form.takeCardFrontUrl.length>0?'flexImg':'',(detail.status==2&&detail.isOld==1) || detail.takeCardFrontAud==2 || ($route.query.giveId?false:true)?'':'noLook']" @click="activec = 'takeCardFrontUrl'">
					<van-uploader
					:max-count="2"
					:deletable='(detail.status==2&&detail.isOld==1) || detail.takeCardFrontAud==2 || ($route.query.giveId?false:true)?true:false'
					v-model="form.takeCardFrontUrl"
					:after-read="afterRead"
					upload-text='身份证'
					image-fit='fill'
					/>
					<!-- :disabled='(detail.status==2&&detail.isOld==1) || detail.takeCardFrontAud!=2?false:true' -->
					<span class="show colore5 remark" v-if="detail.status==2 && detail.takeCardFrontAud==2">{{detail.takeCardFrontRemarks}}</span>
				</p>
			</div>

			<div class="flex justs alic lh60">上传委托书：</div>
			<p :class="['entrustImg','boxImg',(detail.status==2&&detail.isOld==1) || detail.takePowerAud==2 || ($route.query.giveId?false:true)?'':'noLook']" @click="activec = 'takePowerUrl'">
				<van-uploader
				:max-count="1"
				:deletable='(detail.status==2&&detail.isOld==1) || detail.takePowerAud==2 || ($route.query.giveId?false:true)?true:false'
				v-model="form.takePowerUrl"
				:after-read="afterRead"
				upload-text='委托书'
				image-fit='fill'
				/>
				<!-- :disabled='(detail.status==2&&detail.isOld==1) || detail.takePowerAud!=2?false:true' -->
				<span class="show colore5" v-if="detail.status==2 && detail.takePowerAud==2">{{detail.takePowerRemarks}}</span>
			</p>
		</template>

		<div class="agreeBtn alic fz12 lh24 borBox" v-if='$route.query.giveId?false:true'>
			<van-checkbox v-model="checked" shape="square" :disabled="$route.query.giveId&&detail.status!=1?true:false"></van-checkbox>
			<span class="ml10">我已经阅读并同意<span class="color005" @click="isShowdialog = true">《患者知情同意书》</span></span>
		</div>
		<div class="w100 foot tc">
			<van-button type="primary" class="submit border0" :disabled="isSubmitIng || detail.status==1 || detail.status==0?true:false" @click="submit">提交</van-button>
		</div> 
		<!-- 天才第一步 end-->
		<van-dialog v-model="isShowdialog" title="《 患者知情同意书 》" :showConfirmButton='false'>
			<div class="textPage fz12 tl ">
				<div class="bookBox">
					<p class="fz16">生命阳光—血液肿瘤患者关爱与援助公益项目</p>
					<p>生命阳光—血液肿瘤患者关爱与援助公益项目是由北京中关村精准医学基金会发起的一个血液肿瘤疾病患者关爱项目，旨在提高患者及家属对疾病现状的认知，提升患者治疗的规范性，提供医患沟通的平台，提高患者生活质量，延长患者寿命。同时，为患者朋友们提供免费的援助用药，让生命全程充满阳光。。</p>
					<p>本项目由北京中关村精准医学公益基金会设立“生命阳光项目办公室”，负责执行项目咨询服务、执行管理工作，齐鲁制药有限公司向基金会捐助项目基金及齐普怡®即来那度胺胶囊，基金会依据参加本项目的志愿医生专业诊断及公益捐助流程，将捐助药品发放给符合医学条件与经济条件的患者，让他们得到更持久和有效的规范治疗，延长寿命的同时，享受高质量的阳光生活。</p>
					<p>项目启动时间：2020年6月1日</p>
					<p>项目申请条件</p>
					<p>医学条件</p>
					<p>a.患者经专业医疗机构确诊为多发性骨髓瘤、淋巴瘤等，根据中国相关法规规定，由专业医疗机构医生判定可以使用来那度胺胶囊（齐普怡®）治疗.</p>
					<p>b.患者根据项目流程规定的时间进行医学检查。</p>
					<p>c.患者在申请慈善援助前，需经项目医生处进行评估，并由项目医生提供评估报告，在指定的时间内完成3个疗程的用药打卡，确定患者需要继续服用齐普怡®治疗，且无禁忌症，不可耐受的毒副反应。经项目办公室审核通过，为其援助一个周期的援助药品。</p>
					<p>经济条件</p>
					<p>本项目捐助对象为持有中华人民共和国居民身份证/军官证的大陆低收入/低保患者。</p>
					<p>齐普怡®公益捐助项目终止条款（发生以下情况捐助药品自动停止）</p>
					<p>1、经项目医生确认，此患者因发生/存在不可耐受的不良反应或者其他不适合继续服用来那度胺胶囊（齐普怡®）治疗指征</p>
					<p>2、患者提供的项目申请资料不实或隐瞒申报。</p>
					<p>3、经查实患者将捐助药品用于销售或其他盈利目的、转赠他人。</p>
					<p>4、接受捐助药品治疗的患者死亡。</p>
					<p>5、患者或法律监护人/亲属要求停止服用来那度胺胶囊（齐普怡®）治疗</p>
					<p>6、捐助药品发放完毕项目自动结束。</p>
					<p>7、由于不可抗力等造成项目被迫终止。</p>
					<p>项目办公室特别声明</p>
					<p>1 、患者需充分理解并愿意承担齐普怡®治疗可能产生的所有不良反应，项目不承担因此而产生的相关经济费用和责任。</p>
					<p>2、本项目为公益项目，患者均需自愿参加，基金会对患者的病情和治疗，以及公益捐助药品所可能产生的所有不良反应不承担责任和义务。</p>
					<p>3、关于本项目的任何信息均以我办正式发布的信息为准，我办不为误信其它渠道信息产生的任何后果承担 责任。如有任何问题，请致电咨询：400-159-0519</p>
					<p>作为一位患者（或监护人），我已阅读上述内容，知晓项目申请条件，并了解齐普怡®治疗可能发生的不良反应，愿意承担所有责任和义务。我愿意加入中关村精准医学基金会“生命阳光—血液肿瘤患者关爱与援助公益项目”，同意并将严格遵守守项目的相关规定，自愿按程序申请。</p>
				</div>
				<div class="comfirBtn pt10">
				<van-button plain  type="primary" size="small" @click="isShowdialog = false;checked = false">不同意</van-button>&nbsp;&nbsp;&nbsp;
				<van-button type="primary" size="small" @click="isShowdialog = false;checked = true">同意</van-button>
				</div>
			</div>
		</van-dialog>

			<!-- 省市 start-->
			<van-popup v-model="provincesShow" position="bottom ">
			<van-picker
				value-key='name'
				show-toolbar
				:columns="provincesArr"
				@cancel="provincesShow = false"
				@confirm="onConfirm"
				@change="provincesOnChange"
			/>
			</van-popup>
			<!-- 省市 end -->
			<!--药房的申请-->
			<van-popup v-model="showdrugRoomType" position="bottom ">
			<van-picker
				show-toolbar
				value-key='name'
				:columns="drugRoomList"
				@cancel="showdrugRoomType = false"
				@confirm="onConfirm"
			/>
			</van-popup>
		<!-- 药房 end -->
		<!-- 帮助说明 start-->
		<van-dialog v-model="isShowHelp" :title="{card:'身份证',invoice:'购药发票',prescription:'医生处方意见',takeCard:'代领人'}[helpType]+'帮助说明'" >
			<div class="dialog-box">
				<template v-if="helpType == 'card'">
					<p class="indent2">确保身份证信息清楚，患者名字和身份证号码务必清晰，同时有效期需要有有效期内。</p>
					<img src="../../../assets/images/card-on.png">
					<img src="../../../assets/images/card-off.png">
				</template>
				<template v-if="helpType == 'invoice'">
					<p class="indent2">购药发票，需要体现购药的单位、购药单位红章/发票章/收费章，患者名字（与注册的名字一致，与身份证名字一致）、购药日期、药品数量、药品名称（须体现齐普怡®或者齐鲁制药有限公司的来那度胺），购药金额。</p>
					<img src="../../../assets/images/invoice.png">
				</template>
				<template v-if="helpType == 'prescription'">
					<p class="indent2">如有医生处方请直接提供，如没有医生处方请提供医嘱单。请参照样表</p>
					<img src="../../../assets/images/prescription.jpg">
				</template>
				<template v-if="helpType == 'takeCard'">
					<p>选择代领人后需要注意以下几点</p>
					<p>1.代领委托书仅针对本次援助有效，如该条援助信息审核失败，重新提交不影响；</p>
					<p>2.代领人填写的身份证号码要与上传的身份证照片一致</p>
					<img src="../../../assets/images/card-on.png">
					<img src="../../../assets/images/card-off.png">
				</template>
			</div>
		</van-dialog>
		<!-- 帮助说明 end -->
	</main>

	<main v-if="active == 2">
		<drug-ro :patienId="$route.query.giveId" :giveTimes='$route.query.giveTimes'></drug-ro>
	</main>

</div>
</template>

<script>
import axios from "axios";
import drugRo from './drugRo'
export default {
components: {drugRo},
data() {
//这里存放数据
	return {
		active: 0,
		form:{
			cardId:'',
			cardFrontUrl:[],
			invoiceOneUrl:[],
			prescriptionUrl:[],
			pharProvinceName:'',
			pharProvinceId:'',
			pharCityId:'',
			pharCityName:'',
			pharmacyId:'',
			pharmacyName:'',
			isTake:0,
			takeCardId:'',
			takeCardFrontUrl:[],
			takePowerUrl:[]
		},
		cardIdTime:false,//验证身份证
		detail:{},
		activec:'',

		provinces:'',
		provincesArr:[{
			values: [],
			className: 'column1'
			},
			{
			values: [],
			className: 'column2',
			}],
		provincesShow:false,
		drugRoomList:[],
		showdrugRoomType:false,
		type:'',
		//知情同意书
		checked:false,
		isShowdialog:false,
		isShowHelp:false,
		helpType:'',
		isSubmitIng:false,
	};
},
computed: {},
watch: {},
methods: {
	getDetail(){
		this.$http.medicineDetailsApi({medId:this.$route.query.giveId}).then(res => {
			if(res.data&&res.data.code == 200){
			let val = res.data.data
			let setVal = this.$upload.strToArr
			let isNull = (val)=> {
				return val?val:''
			}
			this.provinces = val.pharProvinceName+val.pharCityName
      this.form = {
				id:val.id,
				cardFrontUrl:setVal(val.cardFrontUrl),
				invoiceOneUrl:setVal(val.invoiceOneUrl),
				prescriptionUrl:setVal(val.prescriptionUrl),
				pharProvinceName:val.pharProvinceName,
				pharProvinceId:isNull(val.pharProvinceId),
				pharCityId:isNull(val.pharCityId),
				pharCityName:val.pharCityName,
				pharmacyId:isNull(val.pharmacyId),
				pharmacyName:val.pharmacyName,
				isTake:val.isTake,
				takeCardId:val.takeCardId,
				takeCardFrontUrl:setVal(val.takeCardFrontUrl),
				takePowerUrl:setVal(val.takePowerUrl)
			}
			if(0 <= val.status && val.status <= 2){
				this.active = 1
			}else if(10 <= val.status && val.status <= 12){
				this.active = 2
			}
			this.checked = true
			this.detail = val
          }else{
            this.$toast(res.data.message)
          }
        }, response => {
            console.log("error");
        })
	},
	afterRead(file){
		this.$upload.uploadImg(this.$config.api+'/wechat/upload',file)
		.then((res)=>{
			if(res){
				let arr = [...this.form[this.activec]]
				arr.push({url:res,isImage: true})
				this.form[this.activec] = arr.filter((item)=>!('file' in item))
				this.$toast.loading({
					forbidClick:true,
					overlay:true,
					duration:1000,
					message:'上传完成'
				})
			}
		},err=>{
			this.form[this.activec].pop()
		})
	},
	onConfirm(value){
		console.log(value,209)
		if(this.type == 'provinces'){//省市
			this.provincesShow = false
			this.provinces = value[0].name+value[1].name
			this.form.pharProvinceId = value[0].id
			this.form.pharProvinceName = value[0].name
			this.form.pharCityId = value[1].id
			this.form.pharCityName = value[1].name
			this.getRoomList(value[1].id)

			this.form.pharmacyName = '',
			this.form.pharmacyId = '',
			this.drugRoomList = []
		}else if(this.type == 'room'){ //药房
			if(!Array.isArray(value)){
				this.form.pharmacyId = value.id
				this.form.pharmacyName = value.name 
			}
			this.showdrugRoomType = false
		}
	},
	getPro(){
     	this.$http.getProListApi().then(res => {
          if(res.data&&res.data.code == 200){
            let arr = [...this.provincesArr]
            arr[0].values = res.data.data
            this.provincesArr= [...arr]
            this.getCityList(res.data.data[0].code)
          }else{
            this.$toast(res.data.message)
          }
        }, response => {
            console.log("error");
        })
    },
    getCityList(code){
      this.$http.getCityListApi({code:code}).then(res => {
          if(res.data&&res.data.code == 200){
            let arr = [...this.provincesArr]
            arr[1].values = res.data.data
            this.provincesArr= [...arr]
          }else{
            this.$toast(res.data.message)
          }
        }, response => {
            console.log("error");
        });
    },
	getRoomList(cityID){
		let val = {
			cityId:cityID,
		}
		this.$http.getPharListApi(val).then((res) => {
			console.log(res.data)
			if (res.data) {
				if (res.data.code == 200) {
					console.log(res.data.data)
					this.drugRoomList = res.data.data	
				} else {
					this.$toast(res.data.message);
				}
			}
		})
		.catch((error)=>{});
	},
	showProvinces(){ //省市
		this.provincesShow = true
		this.type = 'provinces'
	},
	provincesOnChange(picker, values) {//省市
		//根据code请求数据
		this.getCityList(values[0].code) //根据省code获取城市
	},
	showRoom(){ //医院
		this.showdrugRoomType = true
		this.type = 'room'
	},
	cardRule(val){   //验证身份证
		let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/; 
		clearTimeout(this.cardIdTime)
		this.cardIdTime = setTimeout(()=>{
			if(!regIdCard.test(val)){
			this.$toast('身份证格式错误')
			return false
			}else{
			this.cardIdTime = false
			}
		},1000)
	},
	submit(){ 
		console.log(this.form)
		if(this.cardIdTime){
				this.$toast('身份证号格式错误')
				return false
		}
		let getVal = this.$upload.arrToStr
		let rules = {
			invoiceOneUrl:'购药发票',
			prescriptionUrl:'医生处方意见',
			pharCityId:'省市',
			pharmacyId:'药房',
		}
		if(this.$route.query.giveTimes == 1){
			rules.cardFrontUrl = '身份证正面'
		}
		if(this.form.isTake == 1){//代领人信息
			rules.takeCardId = '代领人身份证号'
			rules.takeCardFrontUrl = '代领人身份证照片'
			rules.takePowerUrl = '委托书照片'
		}
		if(Object.keys(rules).find(item=>this.form[item] == '')){
			this.$toast(rules[Object.keys(rules).find(item=>this.form[item] == '')]+'不能为空')
			return false
		}
		if(!this.checked){
			this.$toast('请同意知情同意书')
			return false
		}
		this.$toast.loading({
			duration: 0, 
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
		});
		this.isSubmitIng = true
		let info = JSON.parse(localStorage.getItem('userInfo'))
      let val={
        id:'',
        patientId:info.id, 
				...this.form,
				cardFrontUrl:getVal(this.form.cardFrontUrl),
				invoiceOneUrl:getVal(this.form.invoiceOneUrl),
				prescriptionUrl:getVal(this.form.prescriptionUrl),
				takeCardFrontUrl:getVal(this.form.takeCardFrontUrl),
				takePowerUrl:getVal(this.form.takePowerUrl),
				cardFrontAud:0,
				cardFrontRemarks:'',
				invoiceOneAud:this.detail.invoiceOneAud == 1?1:0,
				invoiceOneRemarks:'',
				prescriptionAud:0,
				prescriptionRemarks:'',
				takeCardFrontAud:0,
				takeCardFrontRemarks:'',
				takePowerAud:0,
				takePowerRemarks:''
      }
      this.$http.saveMedicineApi(val).then((res) => {
        if (res.data && res.data.code == 200) {
					this.$toast.success({
						duration: 0, 
						message: '提交成功',
						forbidClick: true,
					});
					this.$router.go(-1)
				} else {
					this.$toast(res.data.message);
					this.isSubmitIng = false
				}	  
				setTimeout(()=>{
					this.$toast.clear();
				},1500)
			}).catch((error) => {this.isSubmitIng = false});
		},
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
	const { cardId, giveId } = this.$route.query

	if(giveId){
		this.getDetail()
	}
	this.getPro()
	this.form.cardId = cardId
	console.log(cardId)
},
mounted() {

},
beforeCreate() {}, 
beforeMount() {}, 
beforeUpdate() {}, 
updated() {}, 
beforeDestroy() {},
destroyed() {}, 
activated() {},
}
</script>
<style scoped>
.container{min-height:100% ;}
.inp{border:.01rem solid #ddd;padding:0.05rem .1rem;}
.container >>> .van-steps--horizontal .van-steps__items{padding: 0;}
/* 上传 */
.flexImg >>> .van-uploader__wrapper{
	display: flex;
    justify-content: space-around;
}
.boxImg >>> .van-uploader__preview{  margin: 0;}
.noLook >>> .van-uploader__upload{display: none;}
.invoiceImg >>> .van-uploader , .cardImg >>> .van-uploader{width: 100%;}

.cardImg >>> .van-uploader__upload{
	width: 44vw;
	height: 1.2rem;
	margin:0;
}
.cardImg >>> .van-uploader__preview-image{
	width: 44vw;height: 1.2rem;
}

.cardImg .remark{
	width: 44vw;
}
.invoiceImg >>> .van-uploader__upload{
	width: 29vw;
	height: .8rem;
	margin:0;
}
.invoiceImg >>> .van-uploader__preview-image{
	width: 29vw;height: .8rem;
}
.invoiceImg >>> .van-uploader__preview{ width: 30%;margin:0 .08rem .08rem 0;}

.prescriptionImg >>> .van-uploader__upload{
	width: 92vw;
	height: 1.2rem;
	margin:0;
}
.prescriptionImg >>> .van-uploader__preview-image{
	width: 92vw;height: 1.2rem;
}
.entrustImg >>> .van-uploader__upload{
	width: 92vw;
	height: 1.2rem;
	margin:0;
}
.entrustImg >>> .van-uploader__preview-image{
	width: 92vw;height: 1.2rem;
}
/* 知情同意书 */
.submit{
  width: 1.9rem;background: #707FFF;border-radius: .4rem;
}
.foot{margin:.4rem 0 .2rem 0;}

.agreeBtn{display: flex;color: #969696;margin: .15rem 0 0 0;}
.textPage{padding: .15rem}
.textPage p{text-indent: 2em;line-height: .23rem;}
.comfirBtn{text-align: center;}
.bookBox{height: 4rem;overflow-y: auto;}
/* 帮助说明 */
.dialog-box{ height: 3.5rem;overflow: scroll;padding: .15rem;}
.dialog-box p{text-align: justify;line-height: .2rem;font-size: .13rem;}
.dialog-box img{width: 100%;margin-top: .1rem;}
/* 发票pop */
.checkBox >>> .van-checkbox__label{flex:1}
.dialog-box >>> .van-divider{margin:0}
</style>