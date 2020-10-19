<template>
  <van-tabbar 
    v-model="active"
    active-color="#CBA41A"
    inactive-color="#828282"
  >
    <van-tabbar-item icon="notes-o" to='/GetMedicineList' name='/GetMedicineList' replace>领药列表</van-tabbar-item>
    <van-tabbar-item icon="scan" @click="scanClick">扫一扫</van-tabbar-item>
    <van-tabbar-item icon="contact" to='/InventoryList' name='/InventoryList' replace>库存管理</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import axios from "axios";
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      active:0,
    }
  },
  created(){
    setTimeout(()=>{
      this.setTabbar()
    },300)
  },
  mounted() {
    setTimeout(()=>{
      this.getCofig()
    },200)
  },
  methods:{
    setTabbar(){
      let arr = ['/GetMedicineList','/InventoryList']
      this.isShow = arr.find(src=>src == this.$route.path)
      this.active = this.$route.path
    },
    scanClick(){
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success:  (res) => {
          console.log(res.resultStr,'扫描的结果~')
          const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  scanCode
          window.location.href = res.resultStr
        },
        error:(response)=>{
          this.$toast(response);
        }
      });
    },
    //扫描二维码的配置
    getCofig(){
      const url = (window.location.href).split('#')[0]
        axios.get('https://itp-api.beta.microzan.com.cn/weChat/getTicket?url=' + url)
        .then( (res)=>{
          if(res.data.code  == '200'){
            console.log(res.data.data,'这个是获取调用扫描返回的参数？~~')
            //微信 的配置~~
            this.wxConfig(res.data.data.appid, res.data.data.timestamp,res.data.data.nonceStr, res.data.data.signature)
          }else{
            this.$toast(res.data.message)
          }
        })
        .catch(function (error) {
          console.log(error);
        }); 
    },
    //wx.config的配置
    wxConfig(appId,timestamp,nonceStr,signature){
      console.log(appId+'appId'+timestamp+'timestamp'+nonceStr+ "nonceStr"+signature)
      wx.config({
        beta: true,
        debug: false, // 开启调试模式,
        appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function(){
          console.log('成功')
      });
      wx.error(function (res) {
        console.log('error',res)
        // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
      });
    },
  }
}
</script>