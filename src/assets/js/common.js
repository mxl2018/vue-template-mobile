import Vue from 'vue'

const img = ''
const rows = 15
//时间
// function filterTime(time){
//     if(time){
//         if (time.split(':')[0] < 6) {
//         time = "凌晨\t" + time
//         return time
//         } else if (time.split(':')[0] < 12) {
//         time = "上午\t" + time
//         return time
//         } else if (time.split(':')[0] < 18) {
//         time = "下午\t" + time
//         return time
//         } else if (time.split(':')[0]<24){
//         time = "夜晚\t" + time
//         return time
//         }
//     }else{
//         return
//     }
//   }
//获取地址栏参数
const getQueryString = (name) => {
return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
} 
const change = (t) =>{
    if (t < 10) {
    return "0" + t;
    } else {
    return t;
    }
}
const timestampToTime=(timestamp,ss) => {
  if(!timestamp){
    return ''
  }
  let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = change(date.getDate());
  let h = change(date.getHours());
  let m = change(date.getMinutes()) ;
  let s = change(date.getSeconds());
  if(ss == 'YMDHMS'){
    return Y + '-' + M  + '-' + D  + ' ' + h + ':' + m + ':' + s;
  }else if(ss == 'YMDHM'){
    return Y + '-' + M  + '-' + D  + ' ' + h + ':' + m;
  }if(ss == 'Y'){
    return Y;
  }if(ss == 'M'){
    return M;
  }if(ss == 'D'){
    return D;
  }if(ss == 'H'){
    return h;
  }if(ss == 'YM'){
    return Y + '-' + M;
  }if(ss == 'MD'){
    return M + '/' + D;
  }if(ss == 'HM'){
    return h + ':' + m;
  }
  return Y + '-' + M  + '-' + D;
}
//时间显示问题（几天前、几分钟前）
Vue.filter('fomatTime', function (valueTime) {

  if(valueTime){
    var newData =  Date.parse(new Date());
    var diffTime = Math.abs(newData-valueTime);
    if (diffTime > 7 * 24 * 3600 * 1000) {
      var date = new Date(valueTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('1' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute;

    } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
      // //注释("一周之内");

      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      return dayNum + "天前";

    } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
      // //注释("一天之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
      return dayNum + "小时前";

    } else if (diffTime < 3600 * 1000 && diffTime > 0) {
      // //注释("一小时之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (60 * 1000));
      return dayNum + "分钟前";

    }
  }
});
const getAge=(birthday)=>{
  //出生时间 毫秒
  var birthDayTime = new Date(birthday).getTime(); 
  //当前时间 毫秒
  var nowTime = new Date().getTime(); 
  //一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime-birthDayTime)/31536000000);
}

Vue.filter('timestampToTime', function(val1 = 0, val2 = '') {  //timestampTo
  return timestampToTime(val1,val2)
})
Vue.filter('src', function(val1 = '0', val2 = '') { 
    return img+val1
})
Vue.filter('getAge', function(val1 = '0', val2 = '') { 
    return getAge(val1)
})
Vue.filter('dialysisType', function(val1 = '0', val2 = '') { 
  return dialysisType[val1]
})
Vue.filter('filterStatus', function(val1 = '0', val2 = '') { 
  let obj = {
    '0':'待审核',
    '1':'通过',
    '2':'驳回',
    '10':'待领药',
    '11':'已领药',
    '12':'未领药',
    '20':'已领药',
    '21':'已领药',
    '22':'已领药'
    // '20':'纸质待审核',
    // '21':'纸质审核通过',
    // '22':'纸质审核不通过'
  }
  return obj[val1]
})
const dialysisType = ['','血透','腹透','非透析']

export default  {
    getQueryString,
    getAge,
    timestampToTime,
    img,
    rows,
    dialysisType,
}