import BaseService from './baseService.js'
import {AutoWritedBackModel} from '../common/AutoWrite.js'
@AutoWritedBackModel
class BackService extends BaseService{
	constructor(){
		super(BackService.model)
	}
}
module.exports = new BackService()