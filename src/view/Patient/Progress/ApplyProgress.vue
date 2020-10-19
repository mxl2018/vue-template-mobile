<!--申请进度 -->
<template>
<div>
  <van-tabs type="card" color='#1989fa' class="pt20" v-model="active" @change="medicineList">
    <van-tab title="进行中"></van-tab>
    <van-tab title="已完成"></van-tab>
  </van-tabs>

  <div class="pl10 pr10 borBox">
    <template v-for="item in helpInfo">
      <van-divider class="mb5" :key="item.id">{{item.lastComTime | timestampToTime}}</van-divider>
      <van-steps :active="active" :key="item.id" active-icon="success" inactive-icon='arrow' active-color="#38f" class="pt5">
        <van-step>提交申请</van-step>
        <van-step>待审核</van-step>
        <van-step>带领取</van-step>
      </van-steps>
    </template>
  </div>

</div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
data() {
//这里存放数据
    return {
      helpInfo:[],
      active:0
    };
},
computed: {
  ...mapState(['loginInfo'])
},
watch: {},
methods: {
  medicineList(val=0){
    this.$http.schedListApi({ patientId: this.loginInfo.id ,status:val}).then(res => {
        if(res.data&&res.data.code == 200){
          this.helpInfo = res.data.data
        }else{
          this.$toast(res.data.message)
        }
      }, response => {
          console.log("error");
      })
  },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.medicineList()
},
mounted() {

},

}
</script>
<style scoped>

</style>