import BaseService from './baseService.js'
import {AutoWritedDictModel} from '../common/AutoWrite.js'
@AutoWritedDictModel
class DictService extends BaseService{
	constructor(){
		super(DictService.model)
	}
}
module.exports = new DictService()