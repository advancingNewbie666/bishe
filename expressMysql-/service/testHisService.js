import BaseService from './baseService.js'
import { AutoWritedTestHisModel } from '../common/AutoWrite.js'
@AutoWritedTestHisModel
class TestHisService extends BaseService {
    constructor() {
        super(TestHisService.model)
    }
    itemAndAnswerCreate(body) {
        return TestHisService.model.itemAndAnswerCreate(body)
    }
    findUserList(query) {
        return TestHisService.model.findUserList(query)
    }
}
module.exports = new TestHisService()