import BaseService from './baseService.js'
import {AutoWritedAnswerModel} from '../common/AutoWrite.js'
@AutoWritedAnswerModel
class AnswerService extends BaseService{
	constructor(){
		super(AnswerService.model)
	}
}
module.exports = new AnswerService()