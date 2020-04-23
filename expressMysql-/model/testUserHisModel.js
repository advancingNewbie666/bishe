import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import testItemInfo from './TestItemModel.js'
import testAnswerInfo from './TestAnswerInfoModel.js'
import scheduleItem from './ScheduleItemModel.js'
import userModel from './userModel.js'
class TestUserHisModel extends BaseModel {
    constructor() {
        super('testUserHis', {
            // hisId:{type: Sequelize.INTEGER}
            userId: { type: Sequelize.INTEGER },
            testId: { type: Sequelize.INTEGER },
            itemId: { type: Sequelize.INTEGER },
            scheduleItemId: { type: Sequelize.INTEGER },
            answerId: { type: Sequelize.INTEGER },
            score:{ type: Sequelize.INTEGER },
            // createTime:{type: Sequelize.STRING}
        })
        this.model = super.getModel()
        this.model.sync()
            // 表结构关系关联，一对多关系
        // this.model.belongsTo(userModel['model'], { as: 'userInfo', foreignKey: 'userId' })
        // this.model.belongsTo(testItemInfo['model'], { as: 'testItemInfo', foreignKey: 'itemId' })
        // this.model.belongsTo(testAnswerInfo['model'], { as: 'testAnswerInfo', foreignKey: 'answerId' })
        // this.model.belongsTo(scheduleItem['model'], { as: 'scheduleItem', foreignKey: 'scheduleItemId' })
    }

    itemAndAnswerCreate(entitys) {
        return this.model.bulkCreate(entitys.itemList);
        // this.model.findAll().then((all) => {
        //     var id = all[all.length - 1] && all[all.length - 1].id ? all[all.length - 1].id : 0
        //     entitys.id = id + 1
        //     this.model.create(entitys).then((d) => {
        //         let itemList = entitys.itemList;
        //         if (itemList && itemList.length > 0) {
        //             itemList.forEach((item) => {
        //                 item.testId = d.dataValues.id;
        //                 console.log(testItemModel)
        //                 testItemModel['model'].create(item).then((_d) => {
        //                     let answerList = item.answerList;
        //                     if (answerList && answerList.length > 0) {
        //                         answerList.forEach((ansitem) => {
        //                             ansitem.itemId = _d.dataValues.id
        //                             testAnswerInfo['model'].create(ansitem);
        //                         })
        //                     }
        //                 })

        //             })
        //         }
        //     });
        // })
        // return this.model.findAll();
    }
    findUserList(query) {
        return this.model.findAll({
            attributes: [
                [Sequelize.literal('DISTINCT `userId`'), 'userId'],
            ],
            // exclude: ['id'],
            where: query,
            // include: [{
            //     model: userModel['model'],
            //     as: 'userInfo',
            //     // through: {
            //     attributes: ['id', 'name '] //过滤属性
            //         // }
            // }]
        })
    }
}
module.exports = new TestUserHisModel()