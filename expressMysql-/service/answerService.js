import BaseService from './baseService.js'
import { AutoWritedAnswerModel } from '../common/AutoWrite.js'
@AutoWritedAnswerModel
class AnswerService extends BaseService {
    constructor() {
        super(AnswerService.model)
    }
    itemAndAnswerInfo(entris) {
        return AnswerService.model.itemAndAnswerInfo(entris);
    }
}
module.exports = new AnswerService()