
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
      <router-link :to="{path:'/InvoiceDetail',query:{id:item.id}}"  class="fz12 mr15 ml15 borRad mt10 borBox pt10 pl15 pr15 pb10 flex justs box" v-for="(item,index) in list" :key="index">
        <div>
          <div class="flex flex1 alic">
            <div class="fz16 over width100">{{item.name}}</div>
            <div class="childEnd ml10">{{item.sex==1?'男':'女'}}</div>
          </div>
          <div class="lh30 color6">上传时间：{{item.createTime | timestampToTime}}</div>
        </div>
        <router-link :to="{path:'/UploadInvoice',query:{id:item.id,name:item.name}}" class="color3b flex justc alic">
          <van-icon name="add-square" color='#3BC27E' size="0.2rem"/>
          <span class="ml5">上传发票</span>
        </router-link>
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
  name:'InvoiceManagement',
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
        this.$http.invoiceListApi(param).then(res => {
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
.color3b{color: #3BC27E;}
</style>
