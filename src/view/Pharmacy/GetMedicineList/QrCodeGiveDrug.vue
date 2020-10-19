<!-- 扫描领药 -->
<template>
<div class='container'>
    <!--预约申请-->
    <div class="appoint" v-if="isShowContain">
      <div class="appt-form">
        <div class="appt-item">
            <p class="title"><span class="txtLeft">患者姓名：</span><span class="txt">{{UserData.patientName}}</span> 
            <span class="fr">
              <img  v-show="UserData.status == 10"   src="../../../assets/images/drug2.png"  width="50" height="16"/>
              <img  v-show="UserData.status == 20"   src="../../../assets/images/noRecit.png"  width="50" height="16"/>
              <img  v-show="UserData.status == 21"  src="../../../assets/images/isRecit.png"  width="50" height="16"/>
            </span>
            </p>
        </div>
        <!--目前第几个疗程-->
        <div class="appt-item">
            <p class="title"><span class="txtLeft">手机号码：</span> <span class="txt">{{UserData.mobile}}</span></p>
        </div>
        <div class="appt-item">
            <p class="title"><span class="txtLeft">患者身份证：</span> <span class="txt">{{UserData.cardId}}</span></p>
        </div>
         <!--上传资料-->
        <p class="titless">相关资料：</p>
        <!---图片显示 -->
        <template v-if="UserData.giveTimes == 1">
          <p class="txt">患者身份证</p>
          <div class="appt-item uloadBox22">
            <div class="uploadImg">
                <van-uploader
                :max-count="5"
                v-model="form.cardFrontUrl"
                disabled
                >
              </van-uploader>
            </div>
          </div>
        </template>

        <!-- <p class="txt">购药发票</p>
        <div class="appt-item uloadBox22">
          <div class="uploadImg" >
            <van-uploader
                :max-count="5"
                v-model="form.invoiceOneUrl"
                disabled
                >
              </van-uploader>
          </div>
        </div> -->

        <p class="txt">医生处方</p>
        <div class="appt-item uloadBox22">
          <div class="uploadImg" >
            <van-uploader
                :max-count="5"
                v-model="form.prescriptionUrl"
                disabled
                >
              </van-uploader>
          </div>
        </div>

        <template v-if="UserData.isTake == 1">
          <p class="txt">代领人身份证</p>
          <div class="appt-item uloadBox22">
            <div class="uploadImg">
              <van-uploader
                :max-count="5"
                v-model="form.takeCardFrontUrl"
                disabled
                >
              </van-uploader>
            </div>
          </div>
          <p class="txt">代领人委托书</p>
          <div class="appt-item uloadBox22">
            <div class="uploadImg">
              <van-uploader
                :max-count="5"
                v-model="form.takePowerUrl"
                disabled
                multiple 
                >
              </van-uploader>
            </div>
          </div>
        </template>
        <van-button type="primary" class="w100 submit" v-if="UserData.status == 10"   @click="submit">确认领药</van-button>
        <van-button type="default" class="w100 submit"  v-if="UserData.status > 10"  >已领药</van-button>
      </div>
    <!--预约申请-->
    </div>
    <!--没有权限显示-->
    <div class="remainTxt" v-else>你没有权限进入</div>
    <!--弹窗确认领药-->
  <div>
   <van-dialog
      v-model="isShowDio"
      title='确认领药'
      showCancelButton
      showConfirmButton
      @confirm='confirmDrug'
    >
    <div class="box-dialog">
      <van-cell-group class="borBox  borRad overH">
        <van-field
            v-model="batchName"
            @click="isShowBatch = true"
            label="批号名称"
            placeholder="请选择"
            readonly
            is-link
          />
      </van-cell-group>
    </div>
    </van-dialog>
    <!-- 批号 -->
    <van-popup v-model="isShowBatch" position="bottom ">
      <van-picker
        show-toolbar
        value-key='drugBatch'
        :columns="drugBatchArr"
        @cancel="isShowBatch = false"
        @confirm="comfirmBatch"
      />
    </van-popup>
  </div>
</div>
</template>

<script>
export default {
components: {},
data() {
//这里存放数据
return {
  isShowContain:true,
  isShowDio:false,
  confirm:false,
  UserData:'',
  form:{
    openId:'',
    patientId:'',
    cardId:'',
    mobile:'',
    patientName:'',
    diseaseType:'',
    provinceId:'',
    provinceCode:'',
    provinceName:'',
    cityId:'',
    cityCode:'',
    cityName:'',
    hospitalId:'',
    hospitalName:'',
    doctorId:'',
    doctorName:'',
    prescriptionUrl:[], //医学诊断证明
    takeCardFrontUrl:[], //低收入证明
    takePowerUrl:[], //申请医学评估表
    invoiceOneUrl:[], //购药发票
    cardFrontUrl:[], //身份证
    pharmacyId:'',
    pharmacyName:'',
    leadDate:'',
    id:'',
    remarks:'',
  },
  drugBatchArr:[],
  isShowBatch:false,
  batchName:'',
  form2:{
    drugBatch:''
  }
};
},
computed: {},
watch: {},
methods: {
  submit(){
    this.batchList()
    this.isShowDio = true
  },
  confirmDrug(){
    if(this.form2.drugBatch == ''){
      this.$toast('批号不能为空~')
      return;
    }
    this.$toast.loading({
      mask: true,
      message: '提交中...'
    })
    let data = {
      id:this.form.id,
      drugBatch:this.form2.drugBatch,
    }
    this.$http.confirmedApi(data).then((res) => {
        console.log(res.data)
        if (res.data) {
          if (res.data.code == 200) {
            this.$toast.loading({
              type:'success',
              mask: true,
              message: res.data.message
            });
            this.$notify({
              message: '患者是否在援助药品流向单上签字\n如已签，请忽略该提醒！',
              duration: 8000,
            });
            setTimeout(()=>{
              this.$router.go(-1)
            },1000)
          } else {
            this.$toast(res.data.message);
          }
          setTimeout(()=>{
            this.$toast.clear()
          },1000)
        }
      })
      .catch((error)=>{});
  },
  //获取用户信息
  getUserData(giveMedId){
     this.$http.getDetailApi({id:giveMedId}).then((res) => { 
         
          if (res.data.code == 200) {
            this.UserData = res.data.data
             console.log(res.data.data,'拼接的图片~')
            this.form = {
              patientId:res.data.data.id,
              status:res.data.data.status,
              //显示的
              patientName: res.data.data.patientName,
              mobile: res.data.data.mobile,
              cardId: res.data.data.cardId,
              diseaseType: res.data.data.diseaseType,
              hospitalName: res.data.data.hospitalName,
              doctorName: res.data.data.doctorName,
              pharmacyName: res.data.data.pharmacyName,
              takeCardFrontUrl: this.$upload.strToArr(res.data.data.takeCardFrontUrl),
              takePowerUrl: this.$upload.strToArr(res.data.data.takePowerUrl),
              cardFrontUrl: this.$upload.strToArr(res.data.data.cardFrontUrl),
              prescriptionUrl: this.$upload.strToArr(res.data.data.prescriptionUrl),
              invoiceOneUrl: this.$upload.strToArr(res.data.data.invoiceOneUrl),
            }
          } else {
            this.$toast(res.data.message);
          }
      })
      .catch((error)=>{});
  },
  //检查扫描二维码进来的用户，判断是否能进来
  checUserData(id){
    const openid = localStorage.getItem('openid')
    this.$http.checkCanJoinApi({openId:openId,giveMedId:id}).then((res) => {
        if (res.data.code == 200) {
            this.isShowContain = true
        }else{
          this.isShowContain = false
        }
          
    })
    .catch((error)=>{});
  },
  comfirmBatch(val){
    console.log(val,'222~');
    this.form2.drugBatch = val.drugBatch
    this.isShowBatch = false
  },
  batchList(){
    let pharmacyIds = JSON.parse(localStorage.getItem('pharInfo')).pharmacyId  ||  this.$store.state.loginInfo.pharmacyId
    this.$http.batchListApi({pharmacyId:pharmacyIds}).then( (res) => {
        if(res.data.code  == '200'){
          this.drugBatchArr = res.data.data
        }else{
          this.$toast(res.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
},

//生命周期 - 创建完成（可以访问当前this实例）
created() {
console.log(this.$route.query.giveMedId,'用户的idhhhhhhhhhhhhhhhhhh')
 this.getUserData(this.$route.query.giveMedId)
 this.checUserData(this.$route.query.giveMedId)
},
mounted() {

},

}
</script>
<style scoped>
.container{background-color: #ffffff;min-height: 100%;}
/* 表单提交 */
.appt-form{padding: 0.15rem 0.2rem;}
.van-cell{padding: 5px 10px}
.van-cell >>> .van-field__control{font-size: 0.13rem}
.appt-item .title, .titless{font-size: 0.14rem;margin: 0.1rem 0px;color: #7d7e80}
.appt-item{margin-bottom: 0.14rem}
.uploadImg img{width: 1.4rem;height: 1rem;vertical-align: middl;margin:0 auto}
.uploadImg .txt{margin: 5px 0px;font-size: 0.13rem}
.van-button{height: 35px;line-height: 34px;}
.appt-item .txt{text-align: center}
.appt-item .txtLeft{width: 0.9rem;display: inline-block;}
/* 弹窗的css */
.box-dialog{margin: 0.2rem; }
.submit{margin: 0.4rem 0 0.1rem 0 }
/* 身份证 */
.uloadBox22{display: flex;
   flex-wrap: wrap;justify-content:space-between;text-align: center;
    margin: 0.25rem 0px;
}
.uloadBox22 .uploadImg{
  margin-bottom: 0.3rem
}
.van-uploader >>> .van-uploader__wrapper--disabled {
  opacity: 1;
}
.remainTxt{margin: 0.3rem;text-align: center;font-size: 0.14rem;}
</style>