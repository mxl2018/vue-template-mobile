<template>
  <div class="w100 pb10 bgf2">
    <div class="fz14 color3 lh40 ml15 mr15">患者申请材料清单</div>
    <!-- <div v-for="(item,i) in FAQArr" :key="i" class="pl20 pr20 bgf">
      <div class="fw fz14 lh40 pt10 pt11" v-html="item.title"></div>
      <div class="fz14 color3 indent2 lh24" v-html="item.content"></div>
    </div> -->
    <van-cell :title="item.name" is-link v-for="(item,i) in list" @click="downRow(item.name,item.url)" :key="i"/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list:[]
    };
  },
  name: "faq",
  created() {
    if(this.$route.query.isVolun == 1){ //志愿者
      this.list = [
        {name:'1.授权委托书模板',url:'/yf001.pdf'},
        {name:'2.质保协议（药房版）',url:'/yf002.pdf'},
        {name:'3.模板质量体系调查表模板',url:'/yf003.pdf'},
        {name:'4.项目药房备案资料清单',url:'/yf004.pdf'},
        {name:'5.项目药店备忘录',url:'/yf005.pdf'},
        {name:'6.代领药委托书',url:'/yf006.pdf'},
        {name:'7.齐普怡援助基金会调整沟通函（药房）版',url:'/yf007.pdf'},
        {name:'8.志愿者手册',url:'/zyz001.pdf'},
        {name:'9.患者操作手册',url:'/zl001.pdf'},
      ]
    }else{
      this.list = [
        {name:'1.患者手册',url:'/hz001.pdf'},
        {name:'2.患者操作手册',url:'/zl001.pdf'},
        {name:'3.代领药委托书',url:'/yf006.pdf'}
      ]
    }
    this.getList()
  },
  methods: {
    downRow(name,url){           
        window.open(this.$my.file+url)                  
        // let that = this
        // let oReq = new XMLHttpRequest();        
        //     oReq.open("GET", this.$my.file+url, true);     
        //     oReq.responseType = "blob";               
        //      oReq.onload = function (oEvent) {            
        //       let content = oReq.response;            
        //       let elink = document.createElement('a');            
        //       elink.download = name+'.pdf';    
        //       elink.style.display = 'none';               
        //        let blob = new Blob([content]) 
        //        elink.href = URL.createObjectURL(blob);            
        //        document.body.appendChild(elink);            
        //        elink.click();            
        //        document.body.removeChild(elink);        
        // };       
        // oReq.send();
    },
    getList(){
      this.$http.dataListApi().then( res => {
        if(res.data&&res.data.code == 200){
          // this.list = res.data.data.data
        }
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
