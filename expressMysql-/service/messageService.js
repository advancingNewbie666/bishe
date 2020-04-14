import BaseService from './baseService.js'
import {AutoWritedMessageModel} from '../common/AutoWrite.js'
@AutoWritedMessageModel
class MessageService extends BaseService{
	constructor(){
		super(MessageService.model)
	}
}
module.exports = new MessageService()