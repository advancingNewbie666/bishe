import BaseService from './baseService.js'
import {AutoWritedScheUserRelModel} from '../common/AutoWrite.js'
@AutoWritedScheUserRelModel
class ScheUserRelService extends BaseService{
	constructor(){
		super(ScheUserRelService.model)
	}
}
module.exports = new ScheUserRelService()