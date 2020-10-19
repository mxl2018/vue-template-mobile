
<!-- 这个是患者详情的 信息 -->
<template>
<div class='container'>
    <give-drug :patienId="patienId" :giveId='id'  v-if="isShow"></give-drug>
    <no-give-drug  :patienId="patienId" :giveId='id' v-else></no-give-drug>
</div>
</template>

<script>
import NoGiveDrug from './components/NoGiveDrug'
import GiveDrug from './components/GiveDrug'
export default {
components: {NoGiveDrug,GiveDrug},
data() {
//这里存放数据
return {
  isShow:true,
  patienId:'',
};
},
computed: {},
watch: {},
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   this.patienId = this.$route.query.patienId
   this.id = this.$route.query.id
   if(this.$route.query.status > 10){  
     this.isShow = true
   }else{
     this.isShow = false
   }
},
mounted() {

},
beforeCreate() {}, 
beforeMount() {}, 
beforeUpdate() {}, 
updated() {}, 
beforeDestroy() {},
destroyed() {}, 
activated() {},
}
</script>
<style  scoped>
.container{min-height: 100%;background: #ffffff}

</style>