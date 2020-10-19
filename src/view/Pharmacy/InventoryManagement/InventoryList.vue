
<template>
  <div class="">

    <van-tabs v-model="status" class="mb5" background='#3BC27E' @change="statusChange" color='#FFFF8C' title-active-color='#fff' title-inactive-color='#ececec'>
      <van-tab title="总库存"></van-tab>
      <van-tab title="待入库"></van-tab>
      <van-tab title="寄快递"></van-tab>
    </van-tabs>
    
    <p v-show="status == 1 && list.length>0" class="pl15 pr15 mt15 borBox tr"><span class="colorf3 flex alic juste" @click="isShowHelp = true;"><van-icon name="question" color="#F3665E" class="mr5"/>帮助说明</span></p>

    <template v-for="(item,index) in list" >
      <div @click="showPop(item,index)" class="fz14 lh24 mr15 ml15 borRad mt15 overH box flex alic" v-if='status == 0 && item.yioneQuanty != 0' :key="index">
        <div class="leftDiv bg78" :class="{bgF0:index == currentIndex}"></div>
        <div class="w100 lh30 flex alic justsa pt10 pb10">
          <div>
            <div class="flex flex1 fz14">批号：{{item.batch}}</div>
            <div class="flex alic justs fz14 color70">有效期：{{item.drugTime | timestampToTime}}</div>
          </div>
          <div>
            <div class="color78 fz16">新瑞白</div>
            <div class="color78">库存数量 &nbsp;<span class="fz24">{{item.yioneQuanty}}</span></div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="status == 1">
      <div @click="showPop(item,index)" class="fz14 lh24 mr15 ml15 borRad mt15 overH box flex alic" v-for="(item,index) in list" :key="index">
        <div class="leftDiv bg78" :class="{bgF0:index == currentIndex}"></div>
        <div class="w100 lh30 flex alic justsa pt10 pb10">
        <div>
          <div class="flex flex1 fz14">批号：{{item.drugBatch}}</div>
          <div class="flex alic justs fz14 color70">有效期：{{item.drugTime | timestampToTime}}</div>
        </div>
        <div>
          <div class="color78 fz16" :class="{colorF0:index == currentIndex}">新瑞白</div>
          <div class="color78 fz12" :class="{colorF0:index == currentIndex}">入库数量 &nbsp;<span class="fz24">{{item.instoQty}}</span></div>
        </div>
        </div>
      </div>
    </template>

    <template v-if="status == 2">
      <div @click="showPop(item,index)" class="fz14 lh24 mr15 ml15 borRad mt15 overH box flex alic" v-for="(item,index) in list" :key="index">
        <div class="leftDiv bg78" :class="{bgF0:index == currentIndex}"></div>
        <div class="w100 lh30 flex alic justsa pt10 pb10">
        <div class="flex alic justs fz14 color70">新瑞白</div>
        <div class="color78">{{item.drugTime | timestampToTime}}</div>
        <div class="color78">未寄快递</div>
        </div>
      </div>
    </template>

    <!-- 入库  -->
      <van-dialog v-model="showPopInsto" confirm-button-text='确认入库' showCancelButton :beforeClose='submit' title="入库" >
        <div class="dialog-box">
          <div class="flex justs alic lh60">上传出库单</div>
          <div class="flex justs">
            <p class="boxImg w100" @click="activec = 'instoUrl'">
              <van-uploader
              :max-count="6"
              v-model="form.instoUrl"
              :after-read="afterRead"
              upload-text='出库单'
              image-fit='fill'
              />
            </p>
          </div>
          <div class="flex justs alic lh60">上传药品流向单</div>
          <div class="flex justs">
            <p class="boxImg w100" @click="activec = 'giveUrl'">
              <van-uploader
              :max-count="6"
              v-model="form.giveUrl"
              :after-read="afterRead"
              upload-text='流向单'
              image-fit='fill'
              />
            </p>
          </div>
        </div>
      </van-dialog>
      <!-- 寄快递 -->
      <van-dialog v-model="showPopExe" confirm-button-text='确认录入' showCancelButton :beforeClose='submitExpress' title="快递单号录入" >
        <div class="dialog-box dialog-box1">
          <van-cell-group>
            <van-field
              v-model="formExpress.expreName"
              required
              label="快递公司"
              placeholder="请输入"
            />
            <van-field
              v-model="formExpress.expreNum"
              required
              label="快递单号"
              placeholder="请输入"
            />
          </van-cell-group>
        </div>
      </van-dialog>

      <!-- 帮助说明 start-->
      <van-dialog v-model="isShowHelp" title="帮助说明" >
        <div class="dialog-box">
          <p class="indent2">1.收到药品后再系统里操作，确认收货的同时，上传总厂回执单；</p>
          <p class="indent2">2.同时上传患者领药签字的《援助药品领取流向单》（仅限6月1日后，中关村齐普怡领药的患者签字）；</p>
          <img src="../../../assets/images/insto.jpg">
          <img src="../../../assets/images/go.png">
        </div>
      </van-dialog>
      <!-- 帮助说明 end -->
    
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
      list: [],
      loading: false,
      finished: false,
      page:1,

      isShowHelp:false,
      currentIndex:'',
      currentId:'',
      activec:'',
      showPopExe:false,
      showPopInsto:false,
      form:{
        instoUrl:[],
        giveUrl:[]
      },
      formExpress:{
        expreName:'',
        expreNum:''
      }
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
    this.getList(); 
  },
  methods: {
    showPop(item,index){
      console.log(item,index)
      if(this.status == 1){
        this.showPopInsto = true
      }else if(this.status == 2){
        this.showPopExe = true
      }
      this.currentId = item.id
      this.currentIndex = index
    },
    afterRead(file){
      this.$upload.uploadImg(this.$config.api+'/wechat/upload',file).then((res)=>{
        if(res){
          let arr = [...this.form[this.activec]]
          arr.push({url:res,isImage: true})
          this.form[this.activec] = arr.filter((item)=>!('file' in item))
          this.$toast.loading({
            forbidClick:true,
            overlay:true,
            duration:1000,
            message:'上传完成'
          })
        }else{
          this.form[this.activec].pop()
        }
      })
    },
    getList(val){
      const info = JSON.parse(localStorage.getItem('pharInfo'))
      if(timer){
        return false
      }
      timer = setTimeout(() => {
        let params = {}
        let api = ''
        if(this.status == 0){
          params = {
            pharmacyId:info.pharmacyId,
          }
          api = 'getQuantyListApi'
        }else{
          params = {
            page:this.page,
            rows:this.$my.rows,
            pharmacyId:info.pharmacyId,
            status :this.status,
            ...val
          }
          api = 'getInstoListApi'
        }
        this.$http[api](params).then(res => {
          if(res.data.code  == 200){
            if(this.status == 0){
              let arry = res.data.data
              this.list =[...this.list,...arry];
            }else{
              let arry = res.data.data.rows
              const pages = Math.ceil(Number(res.data.data.total)/this.$my.rows);

              this.list =[...this.list,...arry];
              this.loading = false; 
              this.finished = false
              this.page ++;

              if(arry.length == 0 || this.page > pages){
                this.finished = true;
              }
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
    },
    submit(action, done){
      if (action === 'confirm') {
        let {instoUrl ,giveUrl } = this.form
        if(instoUrl.length == 0){
          this.$toast('出库单不能为空')
          done(false);
          return false
        }
        if(giveUrl.length == 0){
          this.$toast('药品流向单不能为空')
          done(false);
          return false
        }
        let getVal = (arr)=>{
          let newArr = []
          arr.map((item)=>{
          newArr.push(item.url) 
          })
          return newArr.join(',')  
        }
        let data = {
          instoUrl: getVal(instoUrl),
          giveUrl: getVal(giveUrl),
          id:this.currentId
        }
        this.$toast.loading({
          duration: 0, 
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        this.$http.confirmApi(data).then((res) => {
            if (res.data && res.data.code == 200) {
              this.$toast.success('入库成功')
              this.initList()  //加载数据
              done();
            } else {
              this.$toast(res.data.message);
        }
        this.$toast.clear();
        })
        .catch(function(error) {});
      } else {
        done();
      }
    },
    submitExpress(action, done){
      if (action === 'confirm') {
        let {expreName ,expreNum } = this.formExpress
        if(expreName == ''){
          this.$toast('快递公司不能为空')
          done(false);
          return false
        }
        if(expreNum == ''){
          this.$toast('快递单号不能为空')
          done(false);
          return false
        }
        let data = {
          expreName: expreName,
          expreNum: expreNum,
          instoId: this.currentId
        }
        this.$toast.loading({
          duration: 0, 
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        this.$http.instoExpreApi(data).then((res) => {
            if (res.data && res.data.code == 200) {
              this.$toast.success('录入成功')
              this.initList()  //加载数据
              done();
            } else {
              this.$toast(res.data.message);
        }
        this.$toast.clear();
        })
        .catch(function(error) {});
      } else {
        done();
      }
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{background-color: #ffffff;min-height: 100%}
.container .title{border-bottom: 1px solid #e4e4e4}
.patientList{margin-bottom: 0.7rem}
/* 领药 */
.card{width:1.2rem;border-radius: .08rem;}
.bg78{background: #78C78E;}
.bgF0{background: #F04844;}
.color78{color:#78C78E}
.colorF0{color:#F04844}
.leftDiv{width:.05rem;height:1rem;}
.box{
  box-shadow: 0 0 10px #cdcdcd;
  flex: 1;
}
.color70{
  color: #707FFF;
}
/* 最顶头的css */
.top-title h1{font-size: 0.14rem;text-align: center;padding: 0.1rem 0;}
.bottom-btn{display: flex;flex-direction: row;justify-content: space-between;}
.bottom-btn p{text-align: center;}
.bottom-btn p:last-child{padding: 0.1rem 0;}
/* 竖排的css */
.van-tabs >>> .van-tabs__line{background-color: #707FFF;width: 60px!important;}
.van-tabs >>> .van-tab--active{color: #707FFF;}
.van-tabs >>> .van-ellipsis{font-size: 0.14rem;}
.van-cell >>> .van-field__control{font-size: 0.13rem}
.instoTime{line-height: 0.25rem}
.appt-box{display: flex;font-size: 0.14rem;color: #7d7e80;margin-bottom: 0.1rem}
.appt-item2{order:1;width: 0.9rem;}
.appt-item3{order:2;flex-grow: 1;}
/* 帮助说明 */
.dialog-box{ height: 3.5rem;overflow: scroll;padding: .15rem;}
.dialog-box p{text-align: justify;line-height: .2rem;font-size: .13rem;}
.dialog-box img{width: 100%;margin-top: .1rem;}
.dialog-box1{ height: 1rem;}
/* 上传 */
.boxImg >>> .van-uploader__preview{  margin: 0;}
.boxImg >>> .van-uploader{width: 100%;}
.boxImg >>> .van-uploader__preview{ width: 30%;margin:0 .08rem .08rem 0;}
</style>
