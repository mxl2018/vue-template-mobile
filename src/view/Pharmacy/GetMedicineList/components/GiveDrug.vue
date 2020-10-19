<!-- 齐普怡的援助 -->
<template>
<div class='container'>
  <!--预约申请-->
  <div class="appoint">
   
    <div class="appt-form">
      <div class="appt-item">
          <p class="title"><span class="txtLeft">患者姓名：</span><span class="txt">{{UserData.patientName}}</span> <span class="rgImg"><img src="../../../../assets/images/isRecit.png" width="50" height="16"></span></p>
      </div>
      <!--目前第几个疗程-->
      <div class="appt-item">
          <p class="title"><span class="txtLeft">手机号码：</span> <span class="txt">{{UserData.mobile}}</span></p>
      </div>
      <div class="appt-item">
          <p class="title"><span class="txtLeft">患者身份证：</span> <span class="txt">{{UserData.cardId}}</span></p>
      </div>
      <div class="appt-item">
          <p class="title"><span class="txtLeft">领药时间：</span> <span class="txt">{{UserData.leadDate | timestampToTime}}</span></p>
      </div>
      <div class="appt-item">
          <p class="title"><span class="txtLeft">领药药房：</span> <span class="txt">{{UserData.pharmacyName}}</span></p>
      </div>
      <div class="appt-item">
          <p class="title"><span class="txtLeft">快递单号：</span> <span class="txt">{{UserData.waybillCode}}</span></p>
      </div>
   
  </div>
   <!--预约申请-->
</div>
</div>
</template>

<script>
import axios from "axios";
export default {
components: {},
props: ['giveId','patienId'],
data() {
//这里存放数据
return {
  value:'',
  status:'',
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
    prescriptionUrl:'',
    lowIncomeUrl:'',
    applicateEvaluUrl:'',
    pharmacyId:'',
    pharmacyName:'',
    leadDate:'',
    id:'',
    remarks:'',
  },
};
},
computed: {},
watch: {},
methods: {
  //获取用户信息
  getUserData(){
      this.$http.getDetailApi({id:this.giveId}).then((res) => {  
          if (res.data.code == 200) {
            //that.$toast({message:res.data.message,duration:500});
            this.UserData = res.data.data
            this.status = res.data.data.status
             console.log(res.data.data,'拼接的图片~')
            this.form = {
              patientId:res.data.data.id,

              //显示的
              patientName:res.data.data.patientName,
              mobile:res.data.data.mobile,
              cardId:res.data.data.cardId,
              diseaseType:res.data.data.diseaseType,
              hospitalName:res.data.data.hospitalName,
              doctorName:res.data.data.doctorName,
              pharmacyName:res.data.data.pharmacyName,
              //图片
              applicateEvaluUrl:res.data.data.applicateEvaluUrl,
              cardUrl:res.data.data.cardUrl.split(','),
              invoiceUrl:res.data.data.invoiceUrl.split(','),
              lowIncomeUrl:res.data.data.lowIncomeUrl,
              patientInformedUrl:res.data.data.patientInformedUrl,
              prescriptionUrl:res.data.data.prescriptionUrl,
            }
            console.log(res.data.data.invoiceUrl,'拼接的图片~')
             console.log(res.data.data,'拼接的图片~')

            // const prescriptionRemarks =  res.data.data.giveMed.prescriptionRemarks ? res.data.data.giveMed.prescriptionRemarks : ''
            // const lowIncomeRemarks =  res.data.data.giveMed.lowIncomeRemarks  ?  res.data.data.giveMed.lowIncomeRemarks : ''
            // const applicateEvaluRemarks =  res.data.data.giveMed.applicateEvaluRemarks ? res.data.data.giveMed.applicateEvaluRemarks : ' '

            // that.form.remarks = prescriptionRemarks + ' ' + lowIncomeRemarks + ' ' + applicateEvaluRemarks

            this.gethHospital(res.data.data.patient.cityId)
            this.getRoomList(res.data.data.patient.provinceId,res.data.data.patient.cityId)
            
          } else {
            this.$toast(res.data.message);
          }
      })
      .catch((error)=>{});
  },
  
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 this.getUserData()
},
mounted() {

},

}
</script>
<style scoped>
.container{height: 100%;}
.rgImg{float:right;}
 .rgImg img{}
.container{background-color: #ffffff;height: 100%;}
.title .box{ display: flex;flex-direction: row;justify-content: space-between;font-size: 0.12rem;background-color: #ffffff;
padding: 0.15rem 0.1rem;margin: 0 0.2rem;
}
.title .box img{width: 0.25rem;height: 0.25rem;vertical-align: middle;margin: 0 auto}
.title .line{ width: 0.5rem; height: 1px; background-color:#eeeeee;display: block;margin-top:0.13rem;}
.title-item .txt{margin-top: 3px;width: 0.3rem;
    text-align: center;}
.interval{height: 0.1rem;width: 100%;background: #eeeeee}
/* 表单提交 */
.appt-form{padding: 0.15rem 0.2rem;}
.appt-inpt{display: flex;flex-direction: row;align-items: center;border: 1px solid #e4e4e4;
    border-radius: 6px;box-shadow: 0 0 5px #e4e4e4;
    overflow: hidden;}
.van-cell{padding: 5px 10px}
.van-cell >>> .van-field__control{font-size: 0.13rem}
.appt-inpt span img{width: 0.23rem;height: 0.23rem;vertical-align: middle;margin-right: 6px;}
.appt-item .title, .titless{font-size: 0.14rem;margin: 0.1rem 0px;color: #7d7e80}
.appt-item{margin-bottom: 0.14rem}
.uploadImg .img{    border: 1px solid #e4e4e4;overflow: hidden;
    box-shadow: 0 0 5px #e4e4e4;
    border-radius: 6px;}
.uploadImg img{width: 1.4rem;height: 1rem;vertical-align: middl;margin:0 auto}
.uploadImg .txt{margin: 5px 0px;font-size: 0.13rem}
.uplodBox{display: flex;flex-direction: row;justify-content: space-between;text-align: center;margin: 0.25rem 0px;}
.btn-box{margin-bottom: 0.2rem}
.history{font-size: 0.12rem;text-align: center;color: #2F80ED;margin: 0.1rem auto;}
.van-button{height: 35px;line-height: 34px;}
.appt-item .txt{margin-left: 0.3rem;}
.appt-item .txtLeft{width: 0.9rem;display: inline-block;}
/* 待审核中的按钮 */
.waiterBtn .van-button--primary{
    background-color: #969799;
    border: 1px solid #969799;
}
.txtRemian{color: red;font-size: 0.13rem;text-align: center;margin-bottom: 0.15rem}
/* 身份证 */
.uloadBox22{display: flex;
   flex-wrap: wrap;justify-content:space-between;text-align: center;
    margin: 0.25rem 0px;
}
.uloadBox22 .uploadImg{
  margin-bottom: 0.3rem
}
</style>