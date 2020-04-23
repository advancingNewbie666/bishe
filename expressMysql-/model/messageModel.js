import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import user from './UserModel.js'
class MessageModel extends BaseModel{
	constructor(){
		super('message', {
			// messageId:{type: Sequelize.INTEGER}
			messageInfo:{type: Sequelize.STRING},
			userId:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		// this.model.belongsTo(user['model'], {as:'user', foreignKey:'userId'})
	}
}
module.exports = new MessageModel()