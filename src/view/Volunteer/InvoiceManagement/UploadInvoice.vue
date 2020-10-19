
<template>
  <div class="">
    <van-form @submit="onSubmit">
      <div v-for="(item,index) in form.invoiceList" :key="index">
        <van-divider>发票 {{index+1}}</van-divider>
        <van-field
          v-model="form.invoiceList[index].invoiceNum"
          label="发票号"
          placeholder="请输入发票号"
          :rules="[{ required: true, message: '请输入发票号' }]"
        />
        <van-field
          v-model="form.invoiceList[index].giveNum"
          type="number"
          label="盒数"
          placeholder="请输入盒数"
          :rules="[{ required: true, message: '请输入盒数' }]"
        />
        <van-field
          readonly
          clickable
          :value="form.invoiceList[index].invoiceTime"
          label="发票时间"
          placeholder="请选择发票时间"
          @click="showPicker = true;currentIndex = index"
          :rules="[{ required: true, message: '请选择发票时间' }]"
        />
        <van-field label="上传发票" @click="currentIndex = index" :rules="[{ required: true, message: '请上传发票' }]">
          <template #input>
            <van-uploader v-model="form.invoiceList[index].invoiceUrl" :max-count="9" :after-read="afterRead" image-fit='fill'/>
          </template>
        </van-field>
      </div>

      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      
      <div class="flex justsa">
        <van-button type="info" @click.prevent="addInvoive">新增上传发票</van-button>
        <van-button type="primary" native-type="submit">提交本次上传</van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  props: {},
  name:'UploadInvoice',
  data() {
    return {
      form:{
        invoiceList:[{
          invoiceNum:'',
          giveNum:'',
          invoiceTime:'',
          invoiceUrl: [],
        }]
      },
      showPicker: false,
      currentIndex:0
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
    addInvoive(){
      this.form.invoiceList.push({
        invoiceNum:'',
        giveNum:'',
        invoiceTime:'',
        invoiceUrl: [],
      })
    },
    onConfirm(time) {
      this.form.invoiceList[this.currentIndex].invoiceTime = this.$my.timestampToTime(time);
      this.showPicker = false;
    },
    afterRead(file){
      this.$upload.uploadImg(this.$config.api+'/wechat/upload',file)
      .then((res)=>{
        if(res){
          let arr = [...this.form.invoiceList[this.currentIndex].invoiceUrl]
          arr.push({url:res,isImage: true})
          this.form.invoiceList[this.currentIndex].invoiceUrl = arr.filter((item)=>!('file' in item))
          this.$toast.loading({
            forbidClick:true,
            overlay:true,
            duration:1000,
            message:'上传完成'
          })
        }
      },err=>{
        this.form.invoiceList[this.currentIndex].invoiceUrl.pop() //处理500情况下，删除组件自动选择图片
      })
    },
    onSubmit(values) {
      const { id,name } = this.$route.query
      let params = []
      this.form.invoiceList.map(item => {
        params.push({
          ...item,
          patientId:id,
          patientName:name,
          invoiceUrl:this.$upload.arrToStr(item.invoiceUrl)
          })
      })
      console.log('submit',params);
      this.$http.saveInvoiceApi(params).then(res => {
        if(res.data&&res.data.code == 200){
          this.$toast.success({
						duration: 0, 
						message: '提交成功',
						forbidClick: true,
          });
          this.$router.go(-1)
        }else{
          this.$dialog.alert({
            title: '提示',
            message: res.data.message,
          });
        }
        setTimeout(()=>{
					this.$toast.clear();
				},1500)
      }, response => {console.log("error")})
    },

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
