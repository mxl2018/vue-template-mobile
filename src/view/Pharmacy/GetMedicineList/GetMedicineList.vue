
<template>
  <div class="">

    <van-tabs v-model="status" class="mb5" background='#3BC27E' @change="statusChange" color='#FFFF8C' title-active-color='#fff' title-inactive-color='#ececec'>
      <van-tab title="所有患者"></van-tab>
      <van-tab title="未领药"></van-tab>
      <van-tab title="已领药"></van-tab>
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
      <router-link :to="{path:'/GetMedicineListDetail',query:{id:item.id,patientId:item.patientId,status:item.status}}"  class="fz12 mr15 ml15 borRad mt10 borBox pt10 pl15 pr15 pb10 flex justs alic box" v-for="(item,index) in list" :key="index">
        <div>
          <div class="flex flex1 alic">
            <div class="fz16 over width100">{{item.patientName}}</div>
            <div class="childEnd ml10">{{['','男','女'][item.sex]}}</div>
          </div>
          <div class="lh30 color6">援助次数：{{item.applyCount}}</div>
        </div>
        <div class="fz16">{{item.status == 10 ?'未领药':'已领药'}}</div>
      </router-link>
    </van-list>
    
    <tabbar></tabbar>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import Tabbar from '../components/Tabbar'

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
  components:{
    Tabbar
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
      let info = JSON.parse(localStorage.getItem('pharInfo'))
      if(timer){
        return false
      }
      console.log(this.page)
      timer = setTimeout(() => {
        const param = {
          page:this.page,
          rows:this.$my.rows,
          pharmacyId:info.pharmacyId,
          checkStatus:this.status,
          patientName:this.patientSearch,
          ...val
        }
        this.$http.pharGetListApi(param).then(res => {
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
