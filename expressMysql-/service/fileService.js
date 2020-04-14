import BaseService from './baseService.js'
import {AutoWritedFileModel} from '../common/AutoWrite.js'
@AutoWritedFileModel
class FileService extends BaseService{
	constructor(){
		super(FileService.model)
	}
}
module.exports = new FileService()