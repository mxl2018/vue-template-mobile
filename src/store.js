import Vue from 'vue'
import Vuex from 'vuex'
import http from './assets/js/api'
const config = JSON.parse(process.env.VUE_APP_BASE_CONFIG) 
console.log(config)

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loginInfo:{
      //正式制空 oIy7-wQZ4wv0x7Wvg7wkNvMsmTrA 患者；oIy7-we7zG1WJzUlHuULQw5duF6U 志愿者；oIy7-wdvA8lnpRb61kcuI8bWp5YM 药房
      openid:process.env.NODE_ENV == 'development'? 'oIy7-we7zG1WJzUlHuULQw5duF6U':'', 
      id:''
    },
    newsArr:[],
    isHaveMore:true
  },
  getters: {
    // noShow (state) {
    //   return !state.show
    // }
  },
  mutations: {
    setNewsArr(state, playload = {}){ //历史记录直接覆盖当前聊天数组
      state.newsArr = [...state.newsArr , ...playload.list]
      state.isHaveMore = playload.isHaveMore
    },
    pushOneToNewsArr(state, playload = {}){ //发送消息，追加一条
      state.newsArr =  [playload, ...state.newsArr]
    },
    setLoginInfo(state, playload){
      state.loginInfo = {...state.loginInfo,...playload}
    },
    // getList (state, playload) {
    //   state[playload.type] = playload.res,
    //   state.loading = false
    // },
    // setArticle(state, playload){
    //   state.article = playload
    //   state.question = playload.questionList
    //   console.log(playload)
    // }
  },
  actions: {
    getHistoryList({commit},playload){
      let myInfo = JSON.parse(localStorage.getItem('userInfo'))
      http.getHistoryListApi(val).then((res)=>{
        
      },
      err => {
        this.$toast.message = err;
      })
    }
    // getArticleList ({commit},playload) {
    //   axios.post(my.api+"/userArticle/getArticle",playload)
    //     .then(function(res) {
    //       if (res.data.code == 200) {
    //         commit('setArticle', res.data.data)
    //       }else{
    //         this.$toast(res.data.message);
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error)
    //     });
    // },
    // getListLi ({commit}) {
    //   axios.get('http://datainfo.duapp.com/shopdata/getclass.php', {emulateJSON: true})
    //     .then(response => {
    //       console.log(response.data)
    //       commit('getList', {
    //         res: response.data,
    //         type :'listLi' //偷懒不想再写一个mutations方法
    //       })
    //     }, response => {
    //       console.log('error')
    //     })
    // },

  }
})
