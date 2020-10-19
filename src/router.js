import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Register from './view/Patient/Register/Register'
//----------患者端------------
//首页
const Home =  () => import(/* webpackChunkName: 'HomePage' */ './view/Patient/Home/Home')

//项目介绍
const Introduce =  () => import(/* webpackChunkName: 'IntroducePage' */ './view/Patient/Introduce/Introduce')

//发起援助
const ApplyList =  () => import(/* webpackChunkName: 'ApplyPage' */ './view/Patient/ApplyHelp/ApplyList')
const ApplyAid =  () => import(/* webpackChunkName: 'ApplyPage' */ './view/Patient/ApplyHelp/ApplyAid')

//申请进度
const ApplyProgress =  () => import(/* webpackChunkName: 'ProgressPage' */ './view/Patient/Progress/ApplyProgress')

//常见问题
const QA =  () => import(/* webpackChunkName: 'QAPage' */ './view/Patient/QA/QA')

//表格下载
const DownloadData =  () => import(/* webpackChunkName: 'DownPage' */ './view/Patient/DownloadData/DownloadData')

//----------志愿者端------------
const VolunteerLogin =  () => import(/* webpackChunkName: 'VolunteerLoginPage' */ './view/Volunteer/Login/VolunteerLogin')
const PatientList =  () => import(/* webpackChunkName: 'VolunteerPatientPage' */ './view/Volunteer/PatientList/PatientList')
const HelpApplyAid =  () => import(/* webpackChunkName: 'VolunteerPatientPage' */ './view/Volunteer/PatientList/HelpApplyAid')
const PatientListDetail =  () => import(/* webpackChunkName: 'VolunteerPatientPage' */ './view/Volunteer/PatientList/PatientListDetail')
const HelpRegister =  () => import(/* webpackChunkName: 'VolunteerPatientPage' */ './view/Volunteer/PatientList/HelpRegister')
const InvoiceManagement =  () => import(/* webpackChunkName: 'VolunteerInvoicePage' */ './view/Volunteer/InvoiceManagement/InvoiceManagement')
const UploadInvoice =  () => import(/* webpackChunkName: 'VolunteerInvoicePage' */ './view/Volunteer/InvoiceManagement/UploadInvoice')
const InvoiceDetail =  () => import(/* webpackChunkName: 'VolunteerInvoicePage' */ './view/Volunteer/InvoiceManagement/InvoiceDetail')
//-------------药房-------------
const PharmacyLogin =  () => import(/* webpackChunkName: 'PharmacyPage' */ './view/Pharmacy/Login/PharmacyLogin')
const GetMedicineList =  () => import(/* webpackChunkName: 'PharmacyPage' */ './view/Pharmacy/GetMedicineList/GetMedicineList')
const GetMedicineListDetail =  () => import(/* webpackChunkName: 'PharmacyPage' */ './view/Pharmacy/GetMedicineList/GetMedicineListDetail')
const QrCodeGiveDrug =  () => import(/* webpackChunkName: 'PharmacyPage' */ './view/Pharmacy/GetMedicineList/QrCodeGiveDrug')
const InventoryList =  () => import(/* webpackChunkName: 'PharmacyPage' */ './view/Pharmacy/InventoryManagement/InventoryList')

// identity=患者；2=志愿者；3=药房
export default new Router({
  //mode: 'history', 
  routes: [
    //----------患者端------------
    {
      path: '/Patient',
      name: '/Patient',
      component:Home,
      meta: {
        title: '首页',
        requireAuth: true,
        identity:1
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component:Register,
      meta: {
        title: '注册',
        requireAuth: true,
        identity:1
      }
    },
    //项目介绍
    {
      path: '/Introduce',
      name: 'Introduce',
      component:Introduce,
      meta: {
        title: '项目背景',
        requireAuth: false
      }
    },
    //申请援助
    {
      path: '/ApplyList',
      name: 'ApplyList',
      component:ApplyList,
      meta: {
        title: '援助列表',
        requireAuth: true,
        identity:1
      }
    },
    {
      path: '/ApplyAid',
      name: 'ApplyAid',
      component:ApplyAid,
      meta: {
        title: '申请援助',
        requireAuth: true,
        identity:1
      }
    },
    //申请进度
    {
      path: '/ApplyProgress',
      name: 'ApplyProgress',
      component:ApplyProgress,
      meta: {
        title: '申请进度',
        requireAuth: true,
        identity:1
      }
    },
    //常见问题
    {
      path: '/QA',
      name: 'QA',
      component:QA,
      meta: {
        title: '常见问题',
        requireAuth: true,
        identity:1
      }
    },
    //表格下载
    {
      path: '/DownloadData',
      name: 'DownloadData',
      component:DownloadData,
      meta: {
        title: '表格下载',
        requireAuth: false
      }
    },
    //----------志愿者端------------
    {
      path: '/VolunteerLogin',
      name: '/VolunteerLogin',
      component:VolunteerLogin,
      meta: {
        title: '志愿者登录',
        requireAuth: true,
        identity:2
      }
    },
    {
      path: '/PatientList',
      name: '/PatientList',
      component:PatientList,
      meta: {
        title: '患者列表',
        requireAuth: true,
        identity:2
      }
    },
    {
      path: '/PatientListDetail',
      name: '/PatientListDetail',
      component:PatientListDetail,
      meta: {
        title: '患者详情',
        requireAuth: true,
        identity:2
      }
    },
    {
      path: '/HelpApplyAid',
      name: '/HelpApplyAid',
      component:HelpApplyAid,
      meta: {
        title: '申请援助',
        requireAuth: true,
        identity:2
      }
    },
    {
      path: '/HelpRegister',
      name: '/HelpRegister',
      component:HelpRegister,
      meta: {
        title: '代入组',
        requireAuth: true,
        identity:2
      }
    },
    {
      path: '/InvoiceManagement',
      name: '/InvoiceManagement',
      component:InvoiceManagement,
      meta: {
        title: '发票管理',
        requireAuth: true,
        identity:2
      }
    },
    {
      path: '/UploadInvoice',
      name: '/UploadInvoice',
      component:UploadInvoice,
      meta: {
        title: '上传发票',
        requireAuth: false
      }
    },
    {
      path: '/InvoiceDetail',
      name: '/InvoiceDetail',
      component:InvoiceDetail,
      meta: {
        title: '发票详情',
        requireAuth: false
      }
    },
    //-------------药房-------------
    {
      path: '/PharmacyLogin',
      name: '/PharmacyLogin',
      component:PharmacyLogin,
      meta: {
        title: '药房登录',
        requireAuth: true,
        identity:3
      }
    },
    {
      path: '/GetMedicineList',
      name: '/GetMedicineList',
      component:GetMedicineList,
      meta: {
        title: '领药列表',
        requireAuth: true,
        identity:3
      }
    },
    {
      path: '/GetMedicineListDetail',
      name: '/GetMedicineListDetail',
      component:GetMedicineListDetail,
      meta: {
        title: '领药详情',
        requireAuth: true,
        identity:3
      }
    },
    {
      path: '/QrCodeGiveDrug',
      name: '/QrCodeGiveDrug',
      component:QrCodeGiveDrug,
      meta: {
        title: '扫码领药',
        requireAuth: true,
        identity:3
      }
    },
    {
      path: '/InventoryList',
      name: '/InventoryList',
      component:InventoryList,
      meta: {
        title: '库存管理',
        requireAuth: true,
        identity:3
      }
    },
  ]
})