import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import user from './UserModel.js'
import message from './MessageModel.js'
class MessageBackModel extends BaseModel{
	constructor(){
		super('messageBack', {
			// backId:{type: Sequelize.INTEGER}
			messageId:{type: Sequelize.INTEGER},
			backInfo:{type: Sequelize.STRING},
			userId:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		// this.model.belongsTo(message['model'], {as:'message', foreignKey:'messageId'})
		// this.model.belongsTo(user['model'], {as:'user', foreignKey:'userId'})
	}
}
module.exports = new MessageBackModel()