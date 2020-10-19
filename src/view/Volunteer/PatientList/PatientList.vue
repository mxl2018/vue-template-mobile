
<template>
  <div class="">
    <div class="pl30 pr30 pt10 pb10 borBox">
      <van-tabs type="card" color='#3BC27E' v-model="active" @change="changeTab">
        <van-tab title="我的患者"></van-tab>
        <van-tab title="患者池"></van-tab>
      </van-tabs>
    </div>
    
    <my-patient-list v-if="active == 0" ref="myPatient"></my-patient-list>
    <all-patient-list v-if="active == 1"></all-patient-list>

    <router-link to="/HelpRegister">
      <div class="btn-box">
        <p><van-icon name="edit" size='.14rem'/></p>
        <p class="text">入组</p>
      </div>
    </router-link>

    <tabbar></tabbar>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import MyPatientList from './components/MyPatientList'
import AllPatientList from './components/AllPatientList'
import Tabbar from '../components/Tabbar'

let timer = null

export default {
  name: 'PatientList',
  props: {},
  data() {
    return {
      active:0,
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
    MyPatientList,
    AllPatientList,
    Tabbar
  },
  mounted () {

  },
  created () {

  },
  methods: { 
    changeTab(){
      if(this.active == 0){
        this.$refs.myPatient.initList()
      }
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  box-shadow: 0 0 10px #cdcdcd;
}
/* 悬浮 */
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
.width100{max-width: 1rem;}
</style>
