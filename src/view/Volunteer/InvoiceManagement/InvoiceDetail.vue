
<template>
  <div class="fz14 lh40 bgf w100 color3">
    <p class="tc fz16 fw">发票信息</p>
    <div v-for="item in detail.invoiceList" :key="item.id" class="borderte0 lh30 pl15 pr15 borBox">
      <p class="flex alic">
        <span class="width90 tl fw">发票号：</span>
        <span class="color6">{{item.invoiceNum}}</span>
      </p>
      <p class="flex alic">
        <span class="width90 tl fw">发票时间：</span>
        <span class="color6">{{item.invoiceTime | timestampToTime}}</span>
      </p>
      <p class="flex alic">
        <span class="width90 tl fw">盒数：</span>
        <span class="color6">{{item.giveNum}}</span>
      </p>
      <!-- <p class="flex alic">
        <span class="width90 tl fw">规格：</span>
        <span class="color6">{{['','25mg','15mg','10mg'][item.dose]}}</span>
      </p> -->
      <p class="flex">
        <span class="width90 tl fw">发票：</span>
        <span class="flex wrap flex1">
          <img :src="n" @click.stop="showInvoiceImg(n)" v-for="n in item.invoiceUrl.split(',')" :key="n" width="50" height="50" class="mr5 mb5"/>
        </span>
      </p>
    </div>

  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  props: {},
  name:'InvoiceDetail',
  data() {
    return {
      detail:''
    }
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  mounted () {

  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail(){
      const { id } = this.$route.query
      this.$http.detailsInvoiceApi({patientId:id}).then(res => {
        if(res.data&&res.data.code == 200){
          this.detail = res.data.data
        }else{
          this.$toast(res.data.message)
        }
      }, response => {console.log("error")})
    },
    showInvoiceImg(url){
			this.$imagePreview([url]);
		}
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
..width90{width: .9rem;}
</style>
