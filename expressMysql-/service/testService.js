import BaseService from './baseService.js'
import { AutoWritedTestModel } from '../common/AutoWrite.js'
@AutoWritedTestModel
class TestService extends BaseService {
    constructor() {
        super(TestService.model)
    }
    testAndAnswerCreate(entitys) {
        return TestService.model.testAndAnswerCreate(entitys)
    }
}
module.exports = new TestService()