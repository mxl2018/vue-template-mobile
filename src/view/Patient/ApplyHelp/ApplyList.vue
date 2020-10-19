<!--援助列表 -->
<template>
<div class='container'>

    <div class="fz14 pl15 pr15 borBox w100 pt5 color3">
      <router-link 
      class="posRel overH bgf borBox shadow borRad lh60 mt10 show" 
      :to="{path:'/ApplyAid',query:{giveTimes:index+1,cardId:helpInfo.info.cardId,giveId:item.id}}" 
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
      :to="{path:'/ApplyAid',query:{giveTimes:helpInfo.list.length?2:1}}"
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

</div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
data() {
//这里存放数据
    return {
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
  medicineList(){
    this.$http.medicineListApi({ patientId: this.loginInfo.id }).then(res => {
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
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.medicineList()
},
mounted() {

},

}
</script>
<style scoped>
.container{background-color: #EFECF0;min-height: 100%;}
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
</style>