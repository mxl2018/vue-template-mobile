<!--患者列表 -->
<template>
<div class='container'>

    <div class="flex justsa alic color9 pt10 pb10 bgf">
      <div :class="['lh30','pr15','pl15','fz14',activeTab==0?'active':'']" @click="changeTab(0)">基本信息</div>
      <div :class="['lh30','pr15','pl15','fz14',activeTab==1?'active':'']" @click="changeTab(1)">援助信息</div>
      <!-- <div :class="['lh30','pr15','pl15','fz14',activeTab==2?'active':'']" @click="changeTab(2)">随访信息</div> -->
    </div>

    <div class="fz14 lh40 bgf pl15 pb15 borBox w100 mt5 color3" v-if="activeTab == 0">
      <p class="flex alic borderbe0">
        <span class="width90 tl fw">患者姓名：</span>
        <span class="color6 flex1">{{info.patient.name}}</span>
        <!-- <span class="modified" @click="modifiedFucn">修改资料</span> -->
      </p>
      <p class="flex alic borderbe0">
        <span class="width90 tl fw">患者手机号：</span>
        <span class="color6">{{info.patient.mobile}}</span>
      </p>
      <p class="flex alic borderbe0">
        <span class="width90 tl fw">患者身份证：</span>
        <span class="color6">{{info.patient.cardId}}</span>
      </p>
      <p class="flex alic borderbe0">
        <span class="width90 tl fw">所在医院：</span>
        <span class="color6">{{info.patient.hospitalName}}</span>
      </p>
      <p class="flex alic borderbe0">
        <span class="width90 tl fw">医生：</span>
        <span class="color6">{{info.patient.doctorName}}</span>
      </p>
      <p class="flex alic">
        <span class="width90 tl fw">确诊时间：</span>
        <span class="color6">{{info.patient.diagnosisDate | timestampToTime}}</span>
      </p>
      <p class="tc fz16 fw mt10">发票信息</p>
      <div v-for="item in info.invoiceList" :key="item.id" class="borderte0 lh30">
        <!-- <p class="flex alic">
          <span class="width90 tl fw">发票号：</span>
          <span class="color6">{{item.invoiceNum}}</span>
        </p> -->
        <p class="flex alic">
          <span class="width90 tl fw">发票时间：</span>
          <span class="color6">{{item.invoiceTime | timestampToTime}}</span>
        </p>
        <p class="flex alic">
          <span class="width90 tl fw">盒数：</span>
          <span class="color6">{{item.invoiceGivenum}}</span>
        </p>
        <p class="flex alic">
          <span class="width90 tl fw">规格：</span>
          <span class="color6">{{['','25mg','15mg','10mg'][item.dose]}}</span>
        </p>
      </div>

    </div>

    <div class="fz14 pl15 pr15 borBox w100 mt5 color3" v-if="activeTab == 1">
      <router-link 
      class="posRel overH bgf borBox shadow borRad lh60 mt10 show" 
      :to="{path:'/HelpApplyAid',query:{giveTimes:index+1,cardId:helpInfo.info.cardId,giveId:item.id,patientId:item.patientId}}" 
      v-for="(item,index) in helpInfo.list" 
      :key="item.id"
      >
        <div class="flex justs alic tc borRad">
          <span class="w30">第{{item.giveTimes}}次援助</span>
          <span class="line"></span>
          <span class="w30">{{item.createTime | timestampToTime}}</span>
          <span class="w30 color259">查看</span>
        </div>
        <div class="label" :class="{labelActive:item.status == 2}">{{item.status | filterStatus}}</div>
      </router-link>
      <router-link 
      v-if="isShowAdd" 
      class="add" 
      :to="{path:'/HelpApplyAid',query:{giveTimes:helpInfo.list.length?2:1,patientId:$route.query.id}}"
      >
        <span class="fz14 color9 posAbs" style="left: 50%;transform: translateX(-50%);white-space: nowrap;bottom:.05rem">申请援助</span>
      </router-link>

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" >温馨提示</van-divider>

      <p class="fz14 pl15 pr15 borBox lh24 mb5">1、本次操作可以申请来那度胺胶囊(齐普怡®)援助用药。</p>
      <p class="fz14 pl15 pr15 borBox lh24 mb5">2、请按照提示的内容进行资料的上传，或者寻求帮助说明进行指导。</p>
      <p class="fz14 pl15 pr15 borBox lh24 mb5">3、发票为正规渠道购药，“正规渠道”解释权归基金会所有。发票须体现齐普怡或者齐鲁制药有限公司来那度胺。</p>
      <p class="fz14 pl15 pr15 borBox lh24 mb5">4、代领人选项为非必填项，申请时须规划好领药人信息，如果非患者本人领药，均须提供代领人信息，上传代领人身份证正反面原件及代领药委托书</p>
      <p class="fz14 pl15 pr15 borBox lh24 mb5">5、代领药委托书每次只能用于本次领药申请，过期无效。</p>
      <p class="fz14 pl15 pr15 borBox lh24 mb5">6、资料下载中可获取所有援助相关的资料包括代领药委托书等。</p>
      <p class="fz14 pl15 pr15 borBox lh24 pb5">7、本项目更大程度上来支持长期使用齐普怡®的患者，建议患者本人（家属）学会自行操作，避免耽搁援助申请。</p>
    </div>

    <!--修改信息的弹窗-->
    <van-dialog
      v-model="dialoging"
      title="修改信息"
      :showConfirmButton='showConfirmButton'
    >
      <div class="dialogBtn">
        <van-cell-group>
          <van-field v-model="info.name" label="患者姓名"  clearable placeholder="请输入患者姓名" />
          <van-cell class="sex" >
            <template slot="title">
              <span class="custom-text">性别</span>
              <van-radio-group v-model="info.sex" class="flex" >
                <van-radio :name="1" class="flex" checked-color="#07c160">男</van-radio>
                <van-radio :name="2" class="flex ml24" checked-color="#07c160">女</van-radio>
              </van-radio-group>
            </template>
          </van-cell>
          <!-- <van-field v-model="info.cardId" label="患者身份号"  clearable placeholder="请输入患者身份号" /> -->
        </van-cell-group>
        <p class="flex alic twoBtn">
          <span class="confirm-btn" @click="btnSubmit"> 确 认</span>
          <span class="cancel-btn" @click="cancelBtn"> 取 消</span>
        </p>
      </div>
    </van-dialog>
    <router-link to="/DownloadData">
      <div class="btn-box">
        <p><van-icon name="down" size='.14rem'/></p>
        <p class="text">资料</p>
      </div>
    </router-link>
</div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
data() {
//这里存放数据
    return {
    dialoging:false,
    showConfirmButton:false,
    info:{
      patient:{
        patientName:'',
        mobile:'',
        cardId:'',
        type:'',
        projectType:'',
        isGive:''
      },
    },
    activeTab:0,
    helpInfo:{
      list:[],
      info:{
        patientId:'',
        cardId:''
      }
    },
    isShowAdd:false
    };
},
computed: {
  ...mapState(['loginInfo'])
},
watch: {},
methods: {
  getDetailId(){
      this.$http.selectByIdApi({id:this.$route.query.id}).then(res => {
        if(res.data&&res.data.code == 200){
            this.info = res.data.data
        }else{
          this.$toast(res.data.message)
        }
      }, response => {
          console.log("error");
      })
  },
  //显示与隐藏
  modifiedFucn(){
    this.dialoging = true
  },
  //提交修改
  btnSubmit(){
    const that = this
    if(this.info.name.replace(/\s*/g,"") == ''){
      that.$toast('患者姓名不能为空~')
      return
    }
    // if(this.info.cardId == ''){
    //   that.$toast('身份证号不能为空~')
    //   return
    // }
    // if(this.info.cardId){
    //   if(!this.$my.isCardNo.test(this.info.cardId)){
    //     this.$toast('身份证号格式错误')
    //     return false
    //   } 
    // }
    const param = {
        id:this.info.id,
        name: this.info.name,
        // cardId:this.info.cardId,
        sex:this.info.sex,
        userId:JSON.parse(localStorage.getItem('volunteerInfo')).id, 
        userName:JSON.parse(localStorage.getItem('volunteerInfo')).name,
        personType:2,
    }
     axios.post(this.$my.api+'/patient/modify',param)
      .then(res => {
        if(res.data&&res.data.code == 200){
            this.$toast(res.data.message)
            that.getDetailId()
            that.dialoging = false
        }else{
          this.$toast(res.data.message)
        }
      }, response => {
          console.log("error");
      })


  },
  //取消按钮
  cancelBtn(){
     this.getDetailId();
     this.dialoging = false
  },
  medicineList(){
    this.$http.medicineListApi({ patientId: this.$route.query.id }).then(res => {
        if(res.data&&res.data.code == 200){
          let leng = res.data.data
          if(leng.list.length>0){
            console.log(leng.list[leng.list.length-1].status)
            this.isShowAdd = leng.list[leng.list.length-1].status >= 10 ? true : false
          }else{
            this.isShowAdd = true
          }
          this.helpInfo = res.data.data
        }else{
          this.$toast(res.data.message)
        }
      }, response => {
          console.log("error");
      })
  },
  changeTab(val){
    this.activeTab = val
    if(val == 1){
      this.medicineList()
    }
    localStorage.setItem('activeTab',val)
  }
  //
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   this.getDetailId()
   this.activeTab = localStorage.getItem('activeTab')?localStorage.getItem('activeTab'):0
   if(this.activeTab == 1){
     this.medicineList()
   }
},
mounted() {
  console.log(this.$route.query.id)
},

}
</script>
<style scoped>
.container{background-color: #EFECF0;min-height: 100%;}
.bgf1{background: #f1f1f1;}
.width90{width: .9rem;}
.sex >>> .van-cell__title {display: flex;align-items: center;}
.sex .custom-text{max-width: .9rem;display: block;flex:1;}
/* 修改 */
.modified{
  font-size: 0.12rem;
  margin-right: 0.2rem;
  display: block;
  line-height:0.26rem;
  color: #707fff;
  text-align: center;
  font-weight: 600;
}
.twoBtn{
  justify-content: space-evenly;margin: 0.2rem 0px;
}
.confirm-btn, .cancel-btn{width: 0.8rem;display: inline-block;line-height: 0.3rem;text-align: center;font-size: 0.13rem;border-radius: 0.08rem}
.confirm-btn{background-color: #2D9CDB;color: #ffffff;}
.cancel-btn{background-color:#DADADA}
.dialogBtn{margin: 0.08rem}
.van-cell >>> .van-field__control{font-size: 0.14rem;}
.modified .van-cell__value{color: #707FFF;font-weight: 600}
/* new */
.active{
  background: #0032A7;
  border-radius: .3rem;
  color: #fff;
}
/* 援助 */
.label {
    font-size: .12rem;
    line-height: .26rem;
    background: orange;
    position: absolute;
    right: 0;
    top: 0;
    z-Index: 2;
    width:.8rem;
    height: .2rem;
    text-align: center;
    color: #fff;
    -webkit-transform-origin: left bottom;
    -moz-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate(30%,-100%) rotate(45deg);
    -moz-transform: translate(30%,-100%) rotate(45deg);
    transform: translate(30%,-100%) rotate(45deg);
    text-indent: 0;
}
.labelActive{background:red}
.line{width:.01rem;height:.4rem;background: #bbb;}
.w30{width:30%}
.shadow{box-shadow: 0 0 0.06rem 0.04rem #ddd;}
.add {
  display:block;
  border: 1px solid;
  width: 100px;
  height: 100px;
  background: #fff;
  color: #ccc;
  position: relative;
  margin: .5rem auto;
}
.add::before{
  content: '';
  position: absolute;
  left: 50%;
  top: 40%;
  width:.6rem;
  transform: translateX(-.3rem) translateY(-.01rem);
  border-top: .02rem solid;
}
.add::after {
 content: '';
 position: absolute;
 left: 50%;
 top: 40%;
 height: .6rem;
 transform: translateX(-.01rem) translateY(-.3rem);
 border-left: .02rem solid;
}
/* 下载 */
.btn-box{
  width: .4rem;
  height: .4rem;
  background: rgba(112,127,255,.8);
  border-radius: 100%;
  text-align: center;
  font-size: 0.12rem;
  color: #fff;
  position: fixed;
  bottom: .5rem;
  right: 0.25rem;
  z-index: 100;
}
.btn-box .text{font-size: .12rem;}
.btn-box p:first-child{padding-top: 3px;}
.btn-box img{
  vertical-align: middle;
  margin: 0 auto;
  width: 0.16rem;
  height: 0.16rem;
}
</style>