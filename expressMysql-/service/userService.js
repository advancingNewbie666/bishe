import BaseService from './baseService.js'
import {AutoWritedUserModel} from '../common/AutoWrite.js'
@AutoWritedUserModel
class UserService extends BaseService{
	constructor(){
		super(UserService.model)
	}
	// baseFindByLogin(attributes,where){
	// 	const rep = await UserService.model.findAll({attributes, where})
	// 	console.log(rep);
	// 	if(rep&&rep.length>0){
	// 		return rep;
	// 	}else{
	// 		// rep = await UserService.model.findByFilter({attributes, where: {
	// 		// 	userNo:where['userNo']
	// 		// }})
	// 		let reJson = { code:500,msg:'密码错误' }
	// 		if(rep&&rep.length>0){
	// 			return reJson;
	// 		}else{
	// 			reJson.msg='工号'+userNo+'不存在！';
	// 			return reJson
	// 		}
	// 	}
	// }
}
module.exports = new UserService()