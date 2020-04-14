import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
// import scheduleItem from './ScheduleItemModel.js'
class ScheduleUserRelModel extends BaseModel{
	constructor(){
		super('scheduleUserRel', {
			// relId:{type: Sequelize.INTEGER}
			scheduleId:{type: Sequelize.INTEGER},
			userId:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		// this.model.belongsTo(scheduleItem['model'], {as:'scheduleItem', foreignKey:'scheduleItemId'})
	}
}
module.exports = new ScheduleUserRelModel()