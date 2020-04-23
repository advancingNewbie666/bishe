import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import testItemInfo from './TestItemModel.js'
class TestAnswerInfoModel extends BaseModel {
    constructor() {
        super('testAnswerInfo', {
            // answerId:{type: Sequelize.INTEGER}
            answerSeq: { type: Sequelize.STRING },
            isTrue: { type: Sequelize.INTEGER },
            answerName: { type: Sequelize.STRING },
            itemId: { type: Sequelize.INTEGER },
            // createTime:{type: Sequelize.STRING}
        })
        this.model = super.getModel()
        this.model.sync()
            // 表结构关系关联，一对多关系
        // this.model.belongsTo(testItemInfo['model'], { as: 'testItemInfo', foreignKey: 'itemId' })
    }

}
module.exports = new TestAnswerInfoModel()