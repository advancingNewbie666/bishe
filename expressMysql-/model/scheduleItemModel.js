import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import user from './userModel.js'
import scheduleUserRel from './scheduleUserRelModel.js'
class ScheduleItemModel extends BaseModel{
	constructor(){
		super('scheduleItem', {
			// scheduleItemId:{type: Sequelize.INTEGER},
			scheduleId:{type: Sequelize.INTEGER},
			scheduleName:{type: Sequelize.STRING},
			scheduleItemName:{type: Sequelize.STRING},
			scheduleSeq:{type: Sequelize.INTEGER},
			userId:{type: Sequelize.INTEGER},
			scheduleType:{type: Sequelize.INTEGER},
			// isSchedule::{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		this.model.belongsTo(user['model'], {as:'user', foreignKey:'userId'})
	}
	// 特殊的业务方法，多表操作
	findByS(attributes, where){
		return this.model.findLikeByFilter({
			attributes,
			include:[{
				model:scheduleUserRel['model'],
				as: 'scheduleId',
				where: {'userId': where['userId']}
			},{
				// as: 'scheduleName',
				where: {'scheduleName': where['scheduleName']}
			}]
		})
	}
}
module.exports = new ScheduleItemModel()