<!--问答 -->
<template>
<div>

  <van-tabs type="card" color='#1989fa' class="pt20" v-model="active" @change="getList">
    <van-tab title="常见问题"></van-tab>
    <van-tab title="使用技巧"></van-tab>
  </van-tabs>

  <van-collapse v-model="activeNames">
    <van-collapse-item :title="item.title" :name="item.name" v-for="item in collapseArr" :key="item.name">{{item.txt}}</van-collapse-item>
  </van-collapse>

</div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
data() {
//这里存放数据
    return {
      active:0,
      collapseArr:[{title:'标题1',name:1,txt:'下雨了'},{title:'标题2',name:2,txt:'下雨了'}],
      activeNames: ['1'],
    };
},
computed: {
  ...mapState(['loginInfo'])
},
watch: {},
methods: {
  getList(val=0){
    this.$http.questionsListApi().then(res => {
        if(res.data&&res.data.code == 200){
          // this.collapseArr = res.data.data.data
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
  this.getList()
},
mounted() {

},

}
</script>
<style scoped>


</style>