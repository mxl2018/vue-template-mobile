<template>
  <div class="Home w100 bgf">
    
    <div class="banner ml15 mr15 mt15 tc colorF flex justc alic colu lh50 fz28">
      <div>新白瑞</div>
      <div>援助项目</div>
    </div>
    
    <main class="pl15 pr15 pt20 boxRad flex justs alic wrap fw fz16">
      <router-link to='/Introduce' class="li flex justc alic colu borRad mb15">
        <img src="../../../assets/images/introduce.png" height="60"/>
        <span class="colorF pt5">项目介绍</span>
      </router-link>
      <router-link to='/ApplyList' class="li flex justc alic colu borRad mb15">
        <img src="../../../assets/images/help.png" height="60"/>
        <span class="colorF pt5">发起援助</span>
      </router-link>
      <!-- <router-link to='/ApplyProgress' class="li flex justc alic colu borRad mb15">
        <img src="../../../assets/images/pace.png" height="80"/>
        <span class="colorF pt5">进度查询</span>
      </router-link> -->
      <router-link to='/DownloadData' class="li flex justc alic colu borRad mb15">
        <img src="../../../assets/images/down.png" height="60"/>
        <span class="colorF pt5">表格下载</span>
      </router-link>
      <router-link to='/QA' class="li flex justc alic colu borRad mb15">
        <img src="../../../assets/images/problem.png" height="60"/>
        <span class="colorF pt5">常见问题</span>
      </router-link>
    </main>
    
   
  </div>
</template>

<script>

export default {
  data() {
    return {
     
    };
  },
  name: "Home",
  created() {

  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Home{min-height:100%;}
.banner{height: 1.7rem;background:#93D89D;border-radius: .12rem;}
.li{width: 48%;height: 1.4rem;box-shadow: 0px 1px 4px #aaa;}
.li:nth-of-type(1){
  background: url('../../../assets/images/introduce-bg.png') no-repeat center center;
}
.li:nth-of-type(2){
  background: url('../../../assets/images/help-bg.png') no-repeat center center;
}
.li:nth-of-type(3){
  background: url('../../../assets/images/pace-bg.png') no-repeat center center;
}
.li:nth-of-type(4){
  background: url('../../../assets/images/down-bg.png') no-repeat center center;
}
.li:nth-of-type(5){
  background: url('../../../assets/images/problem-bg.png') no-repeat center center;
}
</style>
