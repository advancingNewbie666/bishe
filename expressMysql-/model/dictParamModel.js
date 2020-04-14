import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
class DictParamModel extends BaseModel{
	constructor(){
		super('dictParam', {
			// dictId:{type: Sequelize.INTEGER}
			paramCode:{type: Sequelize.STRING},
			paramValue:{type: Sequelize.INTEGER},
			paramName:{type: Sequelize.STRING}
		})
		this.model = super.getModel()
		this.model.sync()
	}
}
module.exports = new DictParamModel()