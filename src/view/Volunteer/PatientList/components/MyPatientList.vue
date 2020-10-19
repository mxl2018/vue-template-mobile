
<template>
  <div class="">

    <van-tabs v-model="status" class="mb5" background='#3BC27E' @change="statusChange" color='#FFFF8C' title-active-color='#fff' title-inactive-color='#ececec'>
      <van-tab title="所有患者"></van-tab>
      <van-tab title="驳回"></van-tab>
      <van-tab title="待领药"></van-tab>
    </van-tabs>

    <van-search
      v-model="patientSearch"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onPatientSearch"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="fz12 mr15 ml15 borRad mt10 borBox pt10 pl15 pr15 pb10 box" v-for="(item,index) in list" :key="index">
        <div class="flex alic pb5">
          <router-link :to="status == 0 ?{path:'/PatientListDetail',query: {id:item.id,projectType:status}}:{path:'/HelpApplyAid',query:{patientId:item.patientId,giveTimes:item.giveTimes,cardId:item.cardId,giveId:item.id}}" class="flex flex1">
            <div class="fz18 over width100">{{status == 0 ?item.name:item.patientName}}</div>
            <div class="childEnd ml10">{{['','男','女'][item.sex]}}</div>
            <div class="childEnd ml20">援助次数：{{status == 0 ?item.giveMedTimes:item.giveTimes}}</div>
          </router-link>
          <a :href="'tel:'+item.mobile">
            <img src="../../../../assets/images/tel.png" width="20" height="20"/>
          </a>
        </div>
        <router-link :to="status == 0 ?{path:'/PatientListDetail',query: {id:item.id,projectType:status}}:{path:'/HelpApplyAid',query:{patientId:item.patientId,giveTimes:item.giveTimes,cardId:item.cardId,giveId:item.id}}">
          <div class="flex justs alic lh30">
            <div>{{item.hospitalName}}</div>
            <div>{{item.createTime | timestampToTime}}</div>
          </div>
        </router-link> 
      </div>
    </van-list>
    
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

let timer = null
export default {
  props: {},
  data() {
    return {
      status:0,
      patientSearch:'',
      list: [],
      loading: false,
      finished: false,
      page:1,
    }
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  mounted () {

  },
  created () {

  },
  methods: {
    onPatientSearch(){
      this.initList()  
    },
    onLoad(){
      this.getList(); 
    },
    getList(val){
      let info = JSON.parse(localStorage.getItem('volunteerInfo'))
      if(timer){
        return false
      }
      console.log(this.page)
      timer = setTimeout(() => {
        const param = {
          page:this.page,
          rows:this.$my.rows,
          accountId:info.id,
          status:this.status,
          patName:this.patientSearch,
          ...val
        }
        this.$http.getUserListApi(param).then(res => {
            if(res.data.code  == 200){
                let arry = res.data.data.rows
                const pages = Math.ceil(Number(res.data.data.total)/this.$my.rows);
                console.log(pages)

                arry.map((item)=>{
                item.createTime = this.$my.timestampToTime(item.createTime)
                })
                this.list =[...this.list,...arry];
                this.loading = false; 
                this.finished = false
                this.page ++;

                if(arry.length == 0 || this.page > pages){
                  this.finished = true;
                }
            }else{
              this.loading = false;
              this.finished = true;
              this.list = [];
            }
          }).catch(error => {
            console.log(error);
            this.$toast(error)
          })
          timer = null
          clearTimeout(timer)
        },500)
    },
    statusChange(){
      this.initList() 
    },
    initList(){
      this.page = 1
      this.list = []
      this.getList({page:1}); 
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  box-shadow: 0 0 10px #cdcdcd;
}
.width100{max-width: 1rem;}
</style>
