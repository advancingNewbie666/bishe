import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import scheduleItem from './ScheduleItemModel.js'
import testAnswerInfo from './testAnswerInfoModel.js'
import testItemModel from './testItemModel.js'
class TestInfoModel extends BaseModel {
    constructor() {
        super('testInfo', {
            // testId:{type: Sequelize.INTEGER}
            scheduleItemId: { type: Sequelize.INTEGER },
            testName: { type: Sequelize.STRING },
            // testNo:{type: Sequelize.STRING},
            order: { type: Sequelize.INTEGER },
            // createTime:{type: Sequelize.STRING}
        })
        this.model = super.getModel()
        this.model.sync()
            // 表结构关系关联，一对多关系
        // this.model.belongsTo(scheduleItem['model'], { as: 'scheduleItem', foreignKey: 'scheduleItemId' })
    }
    testAndAnswerCreate(entitys) {
        var self = this;
        this.model.findAll().then((all) => {
            var id = all[all.length - 1] && all[all.length - 1].id ? all[all.length - 1].id : 0
            entitys.id = id + 1
            this.model.create(entitys).then((d) => {
                let itemList = entitys.itemList;
                if (itemList && itemList.length > 0) {
                    itemList.forEach((item) => {
                        item.testId = d.dataValues.id;
                        console.log(testItemModel)
                        testItemModel['model'].create(item).then((_d) => {
                            let answerList = item.answerList;
                            if (answerList && answerList.length > 0) {
                                answerList.forEach((ansitem) => {
                                    ansitem.itemId = _d.dataValues.id
                                    testAnswerInfo['model'].create(ansitem);
                                })
                            }
                        })

                    })
                }
            });
        })
        return this.model.findAll();
    }
}
module.exports = new TestInfoModel()