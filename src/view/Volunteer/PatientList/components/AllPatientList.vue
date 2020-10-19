
<template>
  <div class="">

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
          <div class="flex flex1">
            <div class="fz18 over width100">{{item.name}}</div>
            <div class="childEnd ml10">{{item.sex==1?'男':'女'}}</div>
            <div class="childEnd ml20">援助次数：{{item.giveMedTimes}}</div>
          </div>
          <span class="top-right" @click="belongTo(item)">归属</span>
          <a :href="'tel:'+item.mobile">
            <img src="../../../../assets/images/tel.png" width="20" height="20"/>
          </a>
        </div>
        <div class="flex justs alic lh30">
          <div>{{item.hospitalName}}</div>
          <div>{{item.createTime | timestampToTime}}</div>
        </div>
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
          patName:this.patientSearch,
          ...val
        }
        this.$http.patinetShareApi(param).then(res => {
            if(res.data.code  == 200){
                let arry = res.data.data.data.list
                const pages = Math.ceil(Number(res.data.data.data.total)/this.$my.rows);
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
    initList(){
      this.page = 1
      this.list = []
      this.getList({page:1}); 
    },
    belongTo(item){
      let info = JSON.parse(localStorage.getItem('volunteerInfo'))
      let data = {
        accountId:info.id,
        accountName:info.name,
        patinetId:item.id,
        openid:info.openId
      }
      this.$dialog.confirm({
        title: '设置归属',
        message: '确认要归属吗？'
      }).then(() => {
        // on confirm
        this.$http.patientsOfApi(data).then( (res) => {
          if(res.data.code  == 200){
            this.$toast(res.data.message)
            this.initList()
          }else{
            this.$toast(res.data.message)
          }
        }).catch( (error) => {
          this.$toast(error.data.message)
        })
      }).catch(() => {
        // on cancel
      });
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  box-shadow: 0 0 10px #cdcdcd;
}
.top-right{
  font-size: 0.12rem;
  margin-right: 0.2rem;
  display: block;
  width: 0.7rem;
  height: 0.26rem;
  line-height:0.26rem;
  border-radius: 4px;
  background: #707fff;
  text-align: center;
  color: #fff;
}
.width100{max-width: 1rem;}
</style>
