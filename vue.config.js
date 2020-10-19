module.exports = {
    publicPath: './', //修改基础路径
    productionSourceMap: process.env.VUE_APP_CURRENTMODE == 'production'?true:false,//false 混淆
    lintOnSave: false, //关闭list
    chainWebpack: config => {
        config.module
          .rule('images')
            .use('url-loader')
              .loader('url-loader')
              .tap(options => Object.assign(options, { limit:0}))
    },
//   devServer: {
//     proxy: {
//         '/api': {
//             target: 'http://mintest.bnd.mincrozan.com.cn',  // http://bndtest.psp.microzan.com.cn---http://192.168.13.68:8000--http://192.168.13.129:8000
//             ws: true,  // proxy websockets 
//             changeOrigin: true,  // needed for virtual hosted sites
//             pathRewrite: {
//                 '^/api': ''  // rewrite path
//             }
//         },
//     }
// }

}