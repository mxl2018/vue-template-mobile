import axios from 'axios'

import { Toast } from 'vant'

const compress = (fileObj)=>{
	return new Promise((rej,err)=>{
		// max 500 * 320
        const maxHeight = 2000
        const maxWidth = 1200
        let img = new Image()
        img.src = fileObj
        img.onload = () => {
          const originHeight = img.height
          const originWidth = img.width

          let compressedWidth = img.width * 0.8
          let compressedHeight = img.height * 0.8

          // let compressedWidth = img.height
          // let compressedHeight = img.width
          // if ((originWidth > maxWidth) && (originHeight > maxHeight)) {
          //   // 更宽更高，
          //   if ((originHeight / originWidth) > (maxHeight / maxWidth)) {
          //     // 更加严重的高窄型，确定最大高，压缩宽度
          //     compressedHeight = maxHeight
          //     compressedWidth = maxHeight * (originWidth / originHeight)
          //   } else {
          //     //更加严重的矮宽型, 确定最大宽，压缩高度
          //     compressedWidth = maxWidth
          //     compressedHeight = maxWidth * (originHeight / originWidth)
          //   }
          // } else if (originWidth > maxWidth && originHeight <= maxHeight) {
          //   // 更宽，但比较矮，以maxWidth作为基准
          //   compressedWidth = maxWidth
          //   compressedHeight = maxWidth * (originHeight / originWidth)
          // } else if (originWidth <= maxWidth && originHeight > maxHeight) {
          //   // 比较窄，但很高，取maxHight为基准
          //   compressedHeight = maxHeight
          //   compressedWidth = maxHeight * (originWidth / originHeight)
          // } else {
          //   // 符合宽高限制，不做压缩
          // }
          let compressedCanvas = document.createElement("canvas")
          let context = compressedCanvas.getContext("2d")
          compressedCanvas.height = compressedHeight
          compressedCanvas.width = compressedWidth
          context.clearRect(0, 0, compressedWidth, compressedHeight)
          context.drawImage(img, 0, 0, compressedWidth, compressedHeight)
          let base64_img = compressedCanvas.toDataURL('image/jpeg')
          const blobBin = atob(base64_img.split(',')[1]);
          let data = [];
          for(var i = 0; i < blobBin.length; i++) {
              data.push(blobBin.charCodeAt(i));
          }
          let file = new Blob([new Uint8Array(data)], {type: 'image/png'});
          // 上传file 至服务器
          //this.uploadFile(file)
          rej(file)
        }
	})
}

async function uploadImg(url,data ={}){
  Toast.loading({
    forbidClick:true,
    overlay:true,
    duration:0,
    message:'上传当中....'
  })

  // const device = [data]

  // let formData = new FormData();
  // let a = new FileReader()
  
  //  device.map((item)=>{
  //   console.log(item)
  //   formData.append('files', item.file ,item.file.name);
  // })
  
  //  压缩
  let formData = new FormData();
  let file = await compress(data.content)
  formData.append('files',file ,data.file.name);

  return new  Promise((resolve,reject)=>{
    axios.post(url, formData,  {headers:{'Content-Type':'multipart/form-data'}})
      .then(res=>{
        resolve(res.data)
        // Toast.clear()
      },(err) =>{
        reject(err)
        Toast.loading({
          forbidClick:true,
          overlay:true,
          duration:1000,
          message:'上传失败,请重新上传'
        })
      })
  })


}

function arrToStr (arr){
  let newArr = []
  arr.map((item)=>{
    if(item){
      newArr.push(item.url) 
    }
  })
  return newArr.join(',')  
}

function strToArr (arr){
  let newArr = []
  arr = arr?arr.split(','):[]
  arr.map((item)=>{
    if(item){
      newArr.push({url:item, isImage: true}) 
    }
  })
  return newArr
}

export default {
  uploadImg,
  arrToStr,
  strToArr
}