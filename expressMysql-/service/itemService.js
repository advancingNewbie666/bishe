import BaseService from './baseService.js'
import {AutoWritedItemModel} from '../common/AutoWrite.js'
@AutoWritedItemModel
class ItemService extends BaseService{
	constructor(){
		super(ItemService.model)
	}
	findByS(attributes, where){
		return ItemService.model.findByS(attributes, where)
	}
}
module.exports = new ItemService()