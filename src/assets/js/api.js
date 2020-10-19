import axios from './http.js'
const config = JSON.parse(process.env.VUE_APP_BASE_CONFIG) 

export default {
	/* get||post
	return axios.get(`${config.api}/doctor/info/checkIsExist`,{params:params})
	return axios.post(`${config.api}/doctor/info/checkIsExist`,params); 
	*/
	
	//main.js
	checkIsExist (params) {//检查openid  
		return axios.get(`${config.api}/patient/checkIsExist`,{params:params});    
	},  
	getOpenIdApi (params) {//获取openid  
		return axios.post(`${config.api}/wetchat/getOpenId`,params);    
	},     
	//-------------患者-------------
	//注册页
	getProListApi (params) {//省份
		return axios.get(`${config.api}/wet/base/getProList`,{params:params});    
	},   
	getCityListApi (params) {//城市
		return axios.get(`${config.api}/wet/base/getCityList`,{params:params});    
	},   
	getHospListApi (params) {//医院
		return axios.get(`${config.api}/wet/base/getHospList`,{params:params});    
	},   
	saveApi (params) {//注册
		return axios.post(`${config.api}/patient/save`,params);    
	},  
	//首页
	
	//申请援助
	medicineListApi (params) {//获取援助list
		return axios.get(`${config.api}/medinice/medicineList`,{params:params});    
	},  
	medicineDetailsApi (params) {//援助详情
		return axios.get(`${config.api}/medinice/medicineDetails`,{params:params});  
	},  
	getPharListApi (params) {//援助药房
		return axios.get(`${config.api}/wet/base/getPharList`,{params:params});  
	},  
	saveMedicineApi (params) {//申请援助
		return axios.post(`${config.api}/medinice/saveMedicine`,params);    
	}, 
	checkInvoiceApi (params) {//获取发票
		return axios.get(`${config.api}/voluntee/checkInvoice`,{params:params});  
	},  
	//进度
	schedListApi (params) {//申请进度
		return axios.post(`${config.api}/medinice/schedList`,params);    
	},  
	//下载资料
	dataListApi (params) {
		return axios.get(`${config.api}/patient/dataList`,{params:params});  
	},  
	//常见问题
	questionsListApi (params) {
		return axios.get(`${config.api}/patient/questionsList`,{params:params});  
	},  
	//-------------志愿者-----------
	checkIsBind (params) {//检查openid  
		return axios.get(`${config.api}/voluntee/checkIsBind`,{params:params});    
	},  
	bindAccountApi (params) {//志愿者登录
		return axios.post(`${config.api}/voluntee/bindAccount`,params);    
	},  
	//患者列表
	getUserListApi (params) {//我的患者列表
		return axios.post(`${config.api}/voluntee/getUserList`,params);    
	},  
	patinetShareApi (params) {//患者池
		return axios.post(`${config.api}/voluntee/patinetShare`,params);    
	},  
	selectByIdApi (params) {//患者详情  
		return axios.get(`${config.api}/voluntee/selectById`,{params:params});    
	},
	subRegisterApi (params) {//代入组
		return axios.post(`${config.api}/voluntee/subRegister`,params);    
	},   
	patientsOfApi (params) {//设置归属
		return axios.post(`${config.api}/voluntee/patientsOf`,params);    
	},   
	//发票
	invoiceListApi (params) {//发票列表
		return axios.post(`${config.api}/voluntee/invoiceList`,params);    
	},  
	saveInvoiceApi (params) {//保存发票
		return axios.post(`${config.api}/voluntee/saveInvoice`,params);    
	},  
	detailsInvoiceApi (params) {//发票详情  
		return axios.get(`${config.api}/voluntee/detailsInvoice`,{params:params});    
	}, 
	//-------------药房-------------
	checkIsExistApi (params) { //获取药房信息
		return axios.get(`${config.api}/phar/checkIsExist`,{params:params});  
	},  
	pharLoginApi (params) {//药房登录
		return axios.post(`${config.api}/phar/bindAccount`,params);    
	},  
	pharGetListApi (params) {//领药列表
		return axios.post(`${config.api}/phar/getList`,params);    
	},  
	getDetailApi (params) { //获取领药详情
		return axios.get(`${config.api}/phar/getDetail`,{params:params});  
	},  
	batchListApi (params) { //获取批号
		return axios.get(`${config.api}/phar/batchList`,{params:params});  
	},  
	confirmedApi (params) {//确认发药
		return axios.post(`${config.api}/phar/confirmed`,params);    
	},  
	checkCanJoinApi (params) { //检查是否能进入扫码领药页面
		return axios.get(`${config.api}/phar/checkCanJoin`,{params:params});  
	},  
	getQuantyListApi (params) {//库存列表
		return axios.get(`${config.api}/phar/getQuantyList`,{params:params});    
	},  
	getInstoListApi (params) {//待入库列表
		return axios.post(`${config.api}/phar/getInstoList`,params);    
	},  
	confirmApi (params) {//确认入库
		return axios.post(`${config.api}/phar/confirm`,params);    
	},  
	instoExpreApi (params) {//录入快递
		return axios.post(`${config.api}/phar/instoExpre`,params);    
	},  
}