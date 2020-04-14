import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import scheduleItem from './ScheduleItemModel.js'
import testInfoModel from './testInfoModel.js'
class TestItemModel extends BaseModel{
	constructor(){
		super('testItemInfo', {
			// itemId:{type: Sequelize.INTEGER}
			testId:{type: Sequelize.INTEGER},
			itemName:{type: Sequelize.STRING},
			order:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		this.model.belongsTo(testInfoModel['model'], {as:'testInfoModel', foreignKey:'testId'})
	}
}
module.exports = new TestItemModel()