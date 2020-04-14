import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
// import company from './companyModel.js'
class UserModel extends BaseModel{
	constructor(){
		super('user', {
			// userId:{type: Sequelize.INTEGER},
			name:{type: Sequelize.STRING},
			userNo:{type: Sequelize.STRING},
			password:{type: Sequelize.STRING},
			schoolId:{type: Sequelize.INTEGER},
			majorId:{type: Sequelize.INTEGER},
			mail:{type: Sequelize.STRING},
			phone:{type: Sequelize.STRING},
			roleId:{type: Sequelize.INTEGER},
			// createTime:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
		// 表结构关系关联，一对多关系
		// this.model.belongsTo(company['model'], {as:'company', foreignKey:'companyId'})
	}
}
module.exports = new UserModel()