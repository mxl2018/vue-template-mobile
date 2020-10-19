import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.css'  // 外部static样式
import './assets/js/rem.js'
import my from './assets/js/common.js'
import http from './assets/js/api'
/*
根据环境读取config配置；开发与测试环境配置相同，没有区分
dev：读取.env.development文件（开发环境）
test：读取.env.test文件（测试环境）
pro：读取.env.production文件（生产环境）
------运行------
yarn serve-dev
yarn serve-test
yarn serve-pro
------打包------
yarn build-dev
yarn build-test
yarn build-pro
*/
const config = JSON.parse(process.env.VUE_APP_BASE_CONFIG) 
Vue.prototype.$config = config //未用到，暂时未挂载

//上传图片
import upload from './assets/js/uploadImg.js'
Vue.prototype.$upload = upload
//请求封装
Vue.prototype.$http = http 
//常用函数
Vue.prototype.$my = my
Vue.config.productionTip = false


import { 
  Toast ,Field ,CellGroup ,Cell,Search ,PullRefresh,Checkbox, CheckboxGroup ,Icon,ActionSheet ,Button ,Picker,
  Collapse, CollapseItem,Overlay,DatetimePicker ,Popup ,List ,Tabbar, TabbarItem,RadioGroup, Radio,Tag,Dialog ,
  Form,Uploader,Notify ,Tab, Tabs,Divider ,ImagePreview,Empty ,Swipe, SwipeItem,Step, Steps,
} from "vant";

const arr = [ 
  Field ,Toast,CellGroup,Cell,Search ,PullRefresh,Checkbox,Button ,Picker,
  CheckboxGroup,Icon,ActionSheet ,Collapse, CollapseItem,Overlay ,
  DatetimePicker ,Popup ,List ,Tabbar, TabbarItem,RadioGroup, Radio,Tag,Dialog ,
  Form,Uploader ,Notify ,Tab, Tabs,Divider ,ImagePreview,Empty  ,Swipe, SwipeItem,Step, Steps,
  ]
arr.map((e)=>{  //动态生成组件
   Vue.use(e);
})
Vue.prototype.$imagePreview=ImagePreview
// const arr = [Apply ,Toast]
// arr.map((e)=>{
//   Vue.component(e.name,e);
// })

router.beforeEach((to, from, next) => {

  const toPath = config.host+'/#'+to.path //获取code后再次跳转路径 window.location.href
  const hrefurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+config.appId+"&redirect_uri="+encodeURIComponent(toPath)+"&response_type=code&scope=snsapi_base&state=dcabe11a-751f-490f-9dcc-606881c6fcdb#wechat_redirect";
  const code = my.getQueryString('code') //地址栏获取参数
  const toPage = (page) => { //简化next判断
    if(to.path == page){
      next() 
    }else{
      next(page)
    }
  }
  const checkIsBind = () => { //获取志愿者信息
    let openid = localStorage.getItem('openid') || store.state.loginInfo.openid;
    http.checkIsBind({openId:openid}).then( res => {
      if(res.data&&res.data.code == 200){
        const volunteerInfo = res.data.data
        localStorage.setItem('volunteerInfo',JSON.stringify(volunteerInfo))
        store.commit('setLoginInfo',{...volunteerInfo})
        if(volunteerInfo.isBind == 1 && to.meta.identity == 2){ //已登录
          if(to.path == '/VolunteerLogin'){
            next('/PatientList')
          }else{
            next()
          }
        }else{
          toPage('/VolunteerLogin')
        }
      }else{
        toPage('/VolunteerLogin')
      }
    })
  }
  const checkPharExist = () => { //获取药房信息
    let openid = localStorage.getItem('openid') || store.state.loginInfo.openid;
    http.checkIsExistApi({openId:openid}).then( res => {
      if(res.data&&res.data.code == 200){
        const pharInfo = res.data.data
        localStorage.setItem('pharInfo',JSON.stringify(pharInfo))
        store.commit('setLoginInfo',{...pharInfo})
        if(pharInfo && to.meta.identity == 3){ //已登录
          if(to.path == '/PharmacyLogin'){
            next('/GetMedicineList')
          }else{
            next()
          }
        }else{
          toPage('/PharmacyLogin')
        }
      }else{
        toPage('/PharmacyLogin')
      }
    })
  }
  const isLogin = ()=>{//是否登录   
    let openid = localStorage.getItem('openid') || store.state.loginInfo.openid;
    http.checkIsExist({openid:openid}).then( res => {         
      if (res.data.data&&res.data.code == 200) {//已登录
        const info = res.data.data
        localStorage.setItem('userInfo',JSON.stringify(info))
        store.commit('setLoginInfo',{...info})
        //identity: 1=患者；2=志愿者；3=药房
        //isBind: 0=未绑定（登录）；1已绑定
        if(info.identity == 1){
          if(info.isBind == 1 && to.meta.identity == 1){
            if(to.path == '/Register'){
              next('/Patient')
            }else{
              next()
            }
          }else{
            toPage('/Register')
          }
        }else if(info.identity == 2){
          checkIsBind()
        }else if(info.identity == 3){
          checkPharExist()
        }else{
          next()
        } 
      } else {//未登录  
        if(to.meta.identity == 1){
          toPage('/Register')
        }else if(to.meta.identity == 2){
          checkIsBind()
        }else if(to.meta.identity == 3){
          checkPharExist()
        }  
      }
    })
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    if(localStorage.getItem('openid') || store.state.loginInfo.openid){
      if(localStorage.getItem('openid')) store.commit('setLoginInfo',{openid:localStorage.getItem('openid')})
      isLogin()//是否登录 
    }else{ //openid不存在
      if(code){ //根据code获取openid
        http.getOpenIdApi({code:code}).then((res) => {
          if (res.data&&res.data.data.openid&&res.data.code == 200) {
            localStorage.setItem('openid',res.data.data.openid)
            store.commit('setLoginInfo',{openid:res.data.data.openid})//dispatch 异步
            isLogin()//是否登录
          } else {
            Toast(res.data?res.data.message:'请求失败！');
          }
        })
      }else{  //获取code
        window.location.replace(hrefurl)
      }
    }
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
