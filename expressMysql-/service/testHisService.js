import BaseService from './baseService.js'
import {AutoWritedTestHisModel} from '../common/AutoWrite.js'
@AutoWritedTestHisModel
class TestHisService extends BaseService{
	constructor(){
		super(TestHisService.model)
	}
}
module.exports = new TestHisService()