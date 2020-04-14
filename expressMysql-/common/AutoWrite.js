//模拟工厂模式，给每个target的原型上注入新属性
module.exports = {
	AutoWritedPersonModel(target, key, descriptor){
		target.model = require('../model/personModel')
	},
	AutoWritedCompanyModel(target, key, descriptor){
		target.model = require('../model/companyModel')
	},
	AutoWritedUserModel(target, key, descriptor){
		target.model = require('../model/userModel')
	},
	AutoWritedDictModel(target, key, descriptor){
		target.model = require('../model/dictParamModel')
	},
	AutoWritedFileModel(target, key, descriptor){
		target.model = require('../model/fileInfoModel')
	},
	AutoWritedBackModel(target, key, descriptor){
		target.model = require('../model/messageBackModel')
	},
	AutoWritedItemModel(target, key, descriptor){
		target.model = require('../model/scheduleItemModel')
	},
	AutoWritedScheUserRelModel(target, key, descriptor){
		target.model = require('../model/scheduleUserRelModel')
	},
	AutoWritedAnswerModel(target, key, descriptor){
		target.model = require('../model/testAnswerInfoModel')
	},
	AutoWritedTestModel(target, key, descriptor){
		target.model = require('../model/testInfoModel')
	},
	AutoWritedTestHisModel(target, key, descriptor){
		target.model = require('../model/testUserHisModel')
	},
	AutoWritedMessageModel(target, key, descriptor){
		target.model = require('../model/messageModel')
	},
	AutoWritedTestItemModel(target, key, descriptor){
		target.model = require('../model/testItemModel')
	}
}