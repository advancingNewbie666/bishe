import BaseService from './baseService.js'
import {AutoWritedTestItemModel} from '../common/AutoWrite.js'
@AutoWritedTestItemModel
class TestItemService extends BaseService{
	constructor(){
		super(TestItemService.model)
	}
}
module.exports = new TestItemService()