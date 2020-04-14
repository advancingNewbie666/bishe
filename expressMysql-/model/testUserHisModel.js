import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import testItemInfo from './TestItemModel.js'
import testAnswerInfo from './TestAnswerInfoModel.js'
import scheduleItem from './ScheduleItemModel.js'
class TestUserHisModel extends BaseModel{
	constructor(){
		super('testUserHis', {
			// hisId:{type: Sequelize.INTEGER}
			userId:{type: Sequelize.INTEGER},
			itemId:{type: Sequelize.INTEGER},
			scheduleItemId:{type: Sequelize.INTEGER},
			answerId:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		this.model.belongsTo(testItemInfo['model'], {as:'testItemInfo', foreignKey:'itemId'})
		this.model.belongsTo(testAnswerInfo['model'], {as:'testAnswerInfo', foreignKey:'answerId'})
		this.model.belongsTo(scheduleItem['model'], {as:'scheduleItem', foreignKey:'scheduleItemId'})
	}
}
module.exports = new TestUserHisModel()