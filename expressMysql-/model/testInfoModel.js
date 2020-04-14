import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import scheduleItem from './ScheduleItemModel.js'
import testAnswerInfo from './testAnswerInfoModel.js'
// import testItemModel from './testItemModel.js'
class TestInfoModel extends BaseModel{
	constructor(){
		super('testInfo', {
			// testId:{type: Sequelize.INTEGER}
			scheduleItemId:{type: Sequelize.INTEGER},
			testName:{type: Sequelize.STRING},
			// testNo:{type: Sequelize.STRING},
			order:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		this.model.belongsTo(scheduleItem['model'], {as:'scheduleItem', foreignKey:'scheduleItemId'})
	}
	// testAndAnswerCreate(){
		// let testInfo = this.model.baseCreate(entitys);
		// let itemList = entitys.itemList;
		// if(itemList&&itemList.length>0){
		// 	itemList.forEach((item)=>{
		// 		item.testId = testInfo.testId;
		// 		let d =this.testItemModel['model'].baseCreate(req.body)
		// 		let answerList = item.answerList;
		// 		if(answerList&&answerList.length>0){
		// 			answerList.forEach((ansitem)=>{
		// 				ansitem.itemId = d.id
		// 				this.testAnswerInfo['model'].baseCreate(ansitem);
		// 			})
		// 		}
		// 	})
		// }
		// return {success: true, data:'提交成功!'};
	// 	return this.model.findAll();
	// }
	testAndAnswerCreate(entitys){
		let testInfo = this.model.baseCreate(entitys);
		let answerList = entitys.answerList;
		if(answerList&&answerList.length>0){
			answerList.forEach((item)=>{
				item.testId = testInfo.id;
			})
		}
		return this.testAnswerInfo['model'].baseCreateBatch(req.body[answerList]);
	}
}
module.exports = new TestInfoModel()