<!-- 齐普怡的援助 -->
<template>
<div class='container'>
  <!--预约申请-->
  <div class="appoint">
    <!-- <div class="apt-title">
        药房领药
    </div> -->
    <div class="appt-form">
      <div class="appt-box">
        <div class="appt-item2">上班时间：</div><div class="appt-item3">{{form.leadDateStr}}</div>
      </div>
      <div class="appt-box">
        <div class="appt-item2">领药药房：</div><div class="appt-item3">{{form.pharmacyName}}</div>
      </div>
      <div class="appt-box">
        <div class="appt-item2">药房地址：</div><div class="appt-item3">{{form.address}}</div>
      </div>
      <div class="appt-box">
        <div class="appt-item2">药房电话：</div><div class="appt-item3">{{form.pharmacyPhone}}</div>
      </div>
      
      <!--上传资料-->
      <p class="titless">注意事项：</p>
      <div class="appt-item remain">
          <p>请务必携带以下材料前往药房领药：</p>
          <div v-if="giveTimes == 1">
            <p>1、患者身份证原件/代领人持身份证原件/代领人身份证复印件（复印件交给药房）</p>
            <p>2、代领药委托书（原件）</p>
            <p>3、医生处方</p>
          </div>
          <div v-else>
            <p>1、患者身份证原件/代领人持身份证原件/代领人身份证复印件（复印件交给药房）</p>
            <p>2、代领药委托书（原件）</p>
            <p>3、医生处方</p>
          </div>
          <div class="scanBox">
            <div class="scan" id="qrcode"></div>
          </div>
      </div>
      <div class="btn-box">
        <van-button type="primary" class="w100 submit">{{ form.isLead == 0 ? '未领药' : '已领药'}}</van-button>
      </div>
    </div>


  </div>
   <!--预约申请-->

</div>
</template>

<script>
import axios from "axios";
import QRCode from 'qrcodejs2'
export default {
components: {},
props: ['patienId','giveTimes'],
data() {
//这里存放数据
return {
  value:'',
  UserData:{
  },
  form:{
    pharmacyName:'',
    pharmacyPhone:'',
    leadDate:'',
    // id:'',
    mobile:'',
    address:'',
    isLead:'',
    // remarks:'',
  },
};
},
computed: {},
watch: {},
methods: {
  submit(){

  },
  //获取用户信息
  getUserData(){
    const that = this
     axios.get(that.$my.api+"/new/giveMed/getNotice?giveMedId="+that.patienId)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          if (res.data.code == 200) {
            //that.$toast({message:res.data.message,duration:500});
            console.log('获取用户信息~',res.data.data.patient)
            that.UserData = res.data.data && res.data.data
           
            that.form = {
             
              isLead:res.data.data.isLead,
              mobile:res.data.data.mobile,
              address:res.data.data.address,
              patientName:res.data.data.patientName,

              pharmacyName:res.data.data.pharmacyName,
              pharmacyPhone:res.data.data.pharmacyPhone,
              leadDate: res.data.data.leadDate,
              leadDateStr: res.data.data.leadDateStr
            }
             that.$nextTick(() => {
               that.qrcode(res.data.data.qrCode)
            })
            
            that.gethHospital(res.data.data.patient.cityId)
            that.getRoomList(res.data.data.patient.provinceId,res.data.data.patient.cityId)
            
          } else {
            this.$toast(res.data.message);
          }
        }
      })
      .catch((error)=>{});
  },
  //获取二维码
  qrcode(code) {
    console.log(code,"生成二维码的参数~")
    let qrcode = new QRCode('qrcode', {
      width: 132,  
      height: 132,
      text:code, // 二维码地址
      colorDark : "#000",
      colorLight : "#fff",
    })
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
.container{background-color: #ffffff;height: 100%;}
.apt-title{font-size: 0.14rem;color: #7d7e80;padding: 0.12rem;border-bottom: 1px solid #e4e4e4;
        margin: 0 0.15rem;}

.interval{height: 0.1rem;width: 100%;background: #eeeeee}
/* 表单提交 */
.appt-form{padding: 0px 0.2rem;margin: 0.15rem 0px;}
.appt-inpt{display: flex;flex-direction: row;align-items: center;border: 1px solid #e4e4e4;
    border-radius: 6px;box-shadow: 0 0 5px #e4e4e4;
    overflow: hidden;}
.van-cell{padding: 5px 10px}
.van-cell >>> .van-field__control{font-size: 0.13rem}
.appt-inpt span img{width: 0.23rem;height: 0.23rem;vertical-align: middle;margin-right: 6px;}
.titless{font-size: 0.14rem;margin: 0.1rem 0px;color: #7d7e80}
.appt-item{margin-bottom: 0.14rem}
.uploadImg .img{    border: 1px solid #e4e4e4;overflow: hidden;
    box-shadow: 0 0 5px #e4e4e4;
    border-radius: 6px;}
.uploadImg img{width: 1.4rem;height: 1rem;vertical-align: middl;margin:0 auto}
.uploadImg .txt, ..appt-inpt{display: flex;flex-direction: row;align-items: center;border: 1px solid #e4e4e4;
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
.uploadImg img{width: 1.4rem;height: 1rem;vertical-align: middl;margin:0 auto}{margin: 5px 0px;font-size: 0.13rem}
.uplodBox{display: flex;flex-direction: row;justify-content: space-between;text-align: center;margin: 0.25rem 0px;}
.btn-box{margin-bottom: 0.2rem}
.history{font-size: 0.12rem;text-align: center;color: #2F80ED;margin: 0.1rem auto;}
.van-button{height: 35px;line-height: 34px;}
.appt-item .txt{margin-left: 0.3rem;}
.appt-item .txtLeft{width: 1rem;display: inline-block;}
.remain p{font-size: 0.13rem; line-height: 0.25rem;}
.scan img{width: 1rem;height: 1rem;border: 1px solid #e4e4e4;margin: 0.2rem auto}
/* 二维码的css */
 #qrcode {
    display: inline-block;}
  #qrcode   img {
      width: 132px;
      height: 132px;
      background-color: #fff; 
      padding: 6px; 
    }
    .scanBox{
        text-align: center;
        margin: 20px 0px;
    }
/* 前面两列的css */
.appt-box{display: flex;font-size: 0.14rem;color: #7d7e80;margin-bottom: 0.1rem}
.appt-item2{order:1;width: 0.9rem;}
.appt-item3{order:2;flex-grow: 1;}
</style>