
<template>
  <div class="Login flex colu">
    <div class="fz24 ml15 lh60">基本信息</div>

    <p class="ml15 fz16"><span class="colore5">*</span>&nbsp;性别</p>
    <van-field v-model="sexName" placeholder="请选择您的性别" @click="sexShow = true" readonly class="fz16">
      <template #button>
        <span class="color259">选择</span>
      </template>
    </van-field>
    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;姓名</p>
    <van-field v-model="form.name" placeholder="请输入您的姓名" clearable class="fz16"></van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;手机号</p>
    <van-field v-model="form.mobile" placeholder="请输入您的手机号码" clearable class="fz16"></van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;身份证号码</p>
    <van-field v-model="form.cardId" @input='cardRule' placeholder="请选择身份证号码" clearable class="fz16"></van-field>

    <div class="fz24 ml15 lh60">就诊信息</div>

    <p class="ml15 fz16"><span class="colore5">*</span>&nbsp;就诊医院省份</p>
    <van-field v-model="form.provinceName" placeholder="请选择您的就诊医院省份" @click="provinceShow = true" readonly class="fz16">
      <template #button>
        <span class="color259">选择</span>
      </template>
    </van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;就诊城市</p>
    <van-field v-model="form.cityName" placeholder="请选择您的就诊城市" @click="cityShow = true" readonly class="fz16">
      <template #button>
        <span class="color259">选择</span>
      </template>
    </van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;就诊医院</p>
    <van-field v-model="form.hospitalName" placeholder="请选择您的就诊医院" @click="hospitalShow = true" readonly class="fz16">
      <template #button>
        <span class="color259">选择</span>
      </template>
    </van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;就诊医生</p>
    <van-field v-model="form.doctorName" placeholder="请输入您的就诊医生" clearable class="fz16"></van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;疾病确诊时间</p>
    <van-field v-model="form.diagnosisDate" placeholder="请选择您的疾病确诊时间" @click="showDateShow = true" readonly class="fz16">
      <template #button>
        <span class="color259">选择</span>
      </template>
    </van-field>

    <p class="ml15 fz16 mt10"><span class="colore5">*</span>&nbsp;疾病阶段</p>
    <van-field v-model="diseaseStage" placeholder="请选择您的疾病阶段" @click="diseaseStageShow = true" readonly class="fz16">
      <template #button>
        <span class="color259">选择</span>
      </template>
    </van-field>

    <van-checkbox v-model="checked" shape="square" class="fz12 pl15 pr15 borBox mt40">我已阅知本申报所列事项，并保证以上申报内容正确属实</van-checkbox>

    <div class="pb20 pt20 tc pl30 pr30 border0">
      <van-button type="info" class="fz18" block @click="submit">提 交</van-button>
    </div> 

    <!-- sex start-->
    <van-popup v-model="sexShow" position="bottom ">
      <van-picker
        value-key='name'
        show-toolbar
        :columns="sexArr"
        @cancel="sexShow = false"
        @confirm="onSexConfirm"
      />
    </van-popup>
    <!-- sex end -->
    <!-- 省份 start-->
    <van-popup v-model="provinceShow" position="bottom ">
      <van-picker
        value-key='name'
        show-toolbar
        :columns="provinceArr"
        @cancel="provinceShow = false"
        @confirm="onProvinceConfirm"
      />
    </van-popup>
    <!-- 省份 end -->
    <!-- 城市 start-->
    <van-popup v-model="cityShow" position="bottom ">
      <van-picker
        value-key='name'
        show-toolbar
        :columns="cityArr"
        @cancel="cityShow = false"
        @confirm="onCityConfirm"
      />
    </van-popup>
    <!-- 城市 end -->
    <!-- 医院 start-->
    <van-popup v-model="hospitalShow" position="bottom ">
      <van-picker
        value-key='hospitalName'
        show-toolbar
        :columns="hospitalArr"
        @cancel="hospitalShow = false"
        @confirm="onHospitalConfirm"
      />
    </van-popup>
    <!-- 医院 end -->
    <!-- 确诊 start -->
    <van-popup v-model="showDateShow" position="bottom ">
      <van-datetime-picker
        v-model="diagnosisDate"
        type="date"
        @cancel="showDateShow = false"
        @confirm="onDiagnosisDateConfirm"
      />
    </van-popup>
    <!-- 确诊 end -->
    <!-- 疾病阶段 start -->
    <van-popup v-model="diseaseStageShow" position="bottom ">
       <van-picker
        value-key='name'
        show-toolbar
        :columns="diseaseStageArr"
        @cancel="diseaseStageShow = false"
        @confirm="onDiseaseStageConfirm"
      />
    </van-popup>
    <!-- 疾病阶段 end -->
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

let num = 60
let timer = '' 
let nowDay = new Date()
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      form:{
        sex:'',
        name:'',
        mobile:'',
        cardId:'',
        provinceName:'',
        provinceId:'',
        cityId:'',
        cityName:'',
        hospitalName:'',
        hospitalId:'',
        doctorName:'',
        diagnosisDate: nowDay.getFullYear() + '-' + (nowDay.getMonth() + 1) + '-' + nowDay.getDate(),
        diseaseStage:''
      },
      sexName:'',
      sexArr:[{id:1,name:'男'},{id:2,name:'女'}],
      sexShow:false,
      provinceArr:[{name:'g',id:1},{name:'c',id:2}],
      provinceShow:false,
      cityArr:[{name:'liu',id:1},{name:'zhang',id:2}],
      cityShow:false,
      hospitalArr:[{name:'shanghai',id:1},{name:'beijing',id:2}],
      hospitalShow:false, 
      diagnosisDate:new Date(),
      showDateShow:false,
      diseaseStage:'',
      diseaseStageArr:[{name:'初诊',id:1},{name:'诱导',id:2},{name:'移植',id:3},{name:'维持',id:4},{name:'复发',id:5},{name:'巩固',id:6}],
      diseaseStageShow:false,
      checked:false,
      cardIdTime:false
    }
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  mounted () {
    //history.pushState(null, null, location.href);
  },
  created () {
    this.getProList()
  },
  methods: {
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
    onSexConfirm(value, index ) {
      this.form.sex = value.id
      this.sexName = value.name
      this.sexShow = false
    },
    onProvinceConfirm(value, index ) {
      this.form.provinceId = value.code
      this.form.provinceName = value.name
      this.form.cityId = ''
      this.form.cityName = ''
      this.cityArr = []
      this.form.hospitalId = ''
      this.form.hospitalName = ''
      this.hospitalArr = []
      this.provinceShow = false
      this.getCityList(value.code)
    },
    onCityConfirm(value, index ) {
      this.form.cityId = value.id
      this.form.cityName = value.name
      this.cityShow = false
      this.form.hospitalId = ''
      this.form.hospitalName = ''
      this.hospitalArr = []
      this.getHospList(value.id)
    },
    onHospitalConfirm(value, index ) {
      this.form.hospitalId = value.id
      this.form.hospitalName = value.hospitalName
      this.hospitalShow = false
    },
    onDiagnosisDateConfirm(value, index ) {
      this.form.diagnosisDate = this.$my.timestampToTime(value)
      this.showDateShow = false
    },
    onDiseaseStageConfirm(value, index ) {
      this.form.diseaseStage = value.id
      this.diseaseStage = value.name
      this.diseaseStageShow = false
    },
    getProList(){//省份
      this.$http.getProListApi().then(res=>{
        if (res.data.code == 200) {
           this.provinceArr = res.data.data
          } else {
            this.$toast({ message: res.data.message ,duration: 3000,});
          }
      })
    },
    getCityList(code){//城市
      this.$http.getCityListApi({code:code}).then(res=>{
        if (res.data.code == 200) {
           this.cityArr = res.data.data
          } else {
            this.$toast({ message: res.data.message ,duration: 3000,});
          }
      })
    },
    getHospList(cityId){//医院
      this.$http.getHospListApi({cityId:cityId}).then(res=>{
        if (res.data.code == 200) {
           this.hospitalArr = res.data.data
          } else {
            this.$toast({ message: res.data.message ,duration: 3000,});
          }
      })
    },
    submit(){ 
      let rules = {
        sex:'性别',
        name:'姓名',
        mobile:'手机号',
        cardId:'身份证号',
        provinceId:'省份',
        cityId:'城市',
        hospitalId:'医院',
        doctorName:'医生姓名',
        diagnosisDate: '确诊时间',
        diseaseStage:'疾病阶段',
      }
      let havaNull = Object.keys(rules).find(item=>this.form[item] == '')
      if(havaNull){
        this.$toast(`${rules[havaNull]}不能为空`)
        return false
      }
      let regIdPhone = /^1\d{10}$/; 
      if(!regIdPhone.test(this.form.mobile)){
        this.$toast('手机格式错误')
        return false
      }
      if(this.cardIdTime){
        this.$toast('身份证格式错误')
        return false
      }
      if(!this.checked){
        this.$toast('请确认同意书')
        return false
      }
      this.$toast.success({
        duration: 0, 
        message: '提交成功',
        forbidClick: true,
      });
      let val={
        accountId:this.loginInfo.employeeId, 
        ...this.form
      }
      this.$http.subRegisterApi(val).then((res) => {
          if (res.data && res.data.code == 200) {
            this.$toast(res.data.message)
            this.$router.go(-1)
          } else {
            this.$dialog.alert({
              title: '提示',
              message: res.data.message,
            });
          }
          setTimeout(()=>{
            this.$toast.clear();
          },1500)
      })
      .catch(function(error) {});
    },

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
