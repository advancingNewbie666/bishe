import BaseService from './baseService.js'
import { AutoWritedTestItemModel } from '../common/AutoWrite.js'
@AutoWritedTestItemModel
class TestItemService extends BaseService {
    constructor() {
        super(TestItemService.model)
    }
    itemAndAnswerInfo(entitys) {
        return TestItemService.model.itemAndAnswerInfo(entitys)
    }
}
module.exports = new TestItemService()