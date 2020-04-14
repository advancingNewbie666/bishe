import BaseService from './baseService.js'
import {AutoWritedTestModel} from '../common/AutoWrite.js'
@AutoWritedTestModel
class TestService extends BaseService{
	constructor(){
		super(TestService.model)
	}
	// testAndAnswerCreate(){
	// 	return TestService.model.testAndAnswerCreate()
	// }
}
module.exports = new TestService()