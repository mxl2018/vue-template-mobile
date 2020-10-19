
<template>
  <div class="Login flex colu">
    <div class="banner"></div>

    <div class="pb20 pt20 tc pl30 pr30 border0">
      <van-field
        v-model="form.loginName"
        clearable           
        placeholder="请输入账号"
      />

      <van-field
        v-model="form.password"
        clearable           
        type='password'
        placeholder="请输入密码"
      />
      <van-button type="info" class="fz18" block @click="submit">提 交</van-button>
    </div> 

  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  name: 'PharmacyLogin',
  props: {},
  data() {
    return {
      form:{
        loginName:'',
        password:''
      },
    }
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  mounted () {
    //history.pushState(null, null, location.href);
  },
  created () {

  },
  methods: {
    submit(){ 
      let rules = {
        loginName:'账号',
        password:'密码',
      }
      let havaNull = Object.keys(rules).find(item=>this.form[item] == '')
      if(havaNull){
        this.$toast(`${rules[havaNull]}不能为空`)
        return false
      }
      let val={
        openId:this.loginInfo.openid, 
        ...this.form
      }
      this.$http.pharLoginApi(val).then((res) => {
          if (res.data && res.data.code == 200) {
            this.$router.push('/GetMedicineList')
          } else {
            this.$dialog.alert({
              title: '提示',
              message: res.data.message,
            });
          }
      })
      .catch(function(error) {});
    },

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner{
  height: 3rem;width: 100%;background: rgb(173, 219, 192);
}
</style>
