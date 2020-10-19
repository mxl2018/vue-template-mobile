<template>
  <van-tabbar 
    v-model="active"
    active-color="#CBA41A"
    inactive-color="#828282"
  >
    <van-tabbar-item icon="notes-o" to='/PatientList' name='/PatientList' replace>患者列表</van-tabbar-item>
    <van-tabbar-item icon="contact" to='/InvoiceManagement' name='/InvoiceManagement' replace>发票管理</van-tabbar-item>
  </van-tabbar>
</template>
<script>
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
  methods:{
    setTabbar(){
      let arr = ['/PatientList','/InvoiceManagement']
      this.isShow = arr.find(src=>src == this.$route.path)
      this.active = this.$route.path
    },
  }
}
</script>