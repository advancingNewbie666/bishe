import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import scheduleItem from './ScheduleItemModel.js'
class FileInfoModel extends BaseModel{
	constructor(){
		super('fileInfo', {
			// fileId:{type: Sequelize.INTEGER}
			scheduleItemId:{type: Sequelize.INTEGER},
			fileUrl:{type: Sequelize.STRING},
			fileName:{type: Sequelize.STRING},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		this.model.belongsTo(scheduleItem['model'], {as:'scheduleItem', foreignKey:'scheduleItemId'})
	}
}
module.exports = new FileInfoModel()