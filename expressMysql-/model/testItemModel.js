import Sequelize from 'sequelize'
import BaseModel from './baseModel.js'
import testAnswerInfo from './testAnswerInfoModel.js'
class TestItemModel extends BaseModel {
    constructor() {
        super('testItemInfo', {
            // itemId:{type: Sequelize.INTEGER}
            testId: { type: Sequelize.INTEGER },
            itemName: { type: Sequelize.STRING },
            order: { type: Sequelize.INTEGER },
            // createTime:{type: Sequelize.STRING}
        })
        this.model = super.getModel()
        this.model.sync()
            // 表结构关系关联，一对多关系
            // this.model.hasMany(testAnswerInfo['model'], { as: 'testAnswerInfo', foreignKey: 'id', sourceKey: "itemId" })
    }
    itemAndAnswerInfo(entitys) {
        // this.model.hasMany(testAnswerInfo['model'], { as: 'testAnswerInfo', foreignKey: 'id', sourceKey: "itemId" })
        return this.model.findAll({
            where: { 'testId': entitys.testId }
        }).then((res) => {
            return new Promise(
                function(resolve, reject) {
                    if (res && res.length > 0) {
                        res.map(async(resItem, findex) => {
                            await testAnswerInfo['model'].findAll({ where: { itemId: resItem.dataValues.id } }).then((ansListpro) => {
                                let ansList = []
                                return new Promise(
                                    function(resolve, reject) {
                                        if (ansListpro && ansListpro.length > 0) {
                                            ansListpro.map((_pro, index) => {
                                                console.log(_pro.dataValues)
                                                ansList.push(_pro.dataValues);
                                                if (index == ansListpro.length - 1) {
                                                    console.log("==================================================")
                                                    console.log(resItem)
                                                    resItem.dataValues.ansList = ansList
                                                    resolve(resItem)
                                                }
                                            })
                                        }
                                    }).then(
                                    (resItem) => {
                                        return resItem
                                    }
                                )
                            })
                            if (findex = res.length - 1) {
                                resolve(res) // 数据处理完成
                            }
                        })
                    }

                }
            ).then(
                (res) => {
                    console.log("++++++++++++++++++++++++++++++++++++++++++++++")
                    return res
                }, // 成功
                (err) => { console.log(err) } // 失败
            )
        })
    }
}
module.exports = new TestItemModel()