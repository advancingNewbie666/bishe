import express from 'express'
import userService from '../service/userService.js'
import answerService from '../service/answerService.js'
import backService from '../service/backService.js'
import dictService from '../service/dictService.js'
import fileService from '../service/fileService.js'
import itemService from '../service/itemService.js'
import messageService from '../service/messageService.js'
import scheUserRelService from '../service/scheUserRelService.js'
import testHisService from '../service/testHisService.js'
import testService from '../service/testService.js'
import testItemService from '../service/testItemService.js'
const router = express.Router()
class CommonCtroller{
	static initRouter(){
		// 登录
		router.get('/login', async (req, res, next) => {
			try{res.json(await userService.baseFindByFilter(null, req.query))}catch(err){next(err)}
		})
		// 注册
		router.post('/createUser', async (req, res, next) => {
			try{res.json(await userService.baseCreate(req.body))}catch(err){next(err)}
		})
		// 查询下拉框内容
		router.get('/dictParam/where', async (req, res, next) => {
			try{res.json(await dictService.baseFindByFilter(null, req.query))}catch(err){next(err)}
		})
		// 查询教师课程列表 + 查询课程下面的小节信息
		router.get('/schedule/find', async (req, res, next) => {
			try{res.json(await itemService.baseFindByFilter(null, req.query))}catch(err){next(err)}
		})
		// 查询学生课表列表 + 查询该学生能看见的所有课程 -- 通过老师名或者课程名查询
		router.get('/schedule/findByS', async (req, res, next) => {
			try{res.json(await itemService.findByS(Object.values(req.query)))}catch(err){next(err)}
		})
		// 创建该课程--教师
		router.post('/schedule/create', async (req, res, next) => {
			try{res.json(await itemService.baseCreate(req.body))}catch(err){next(err)}
		})
		// 加入该课程--学生
		router.post('/schedule/joinSchedule', async (req, res, next) => {
			try{res.json(await scheUserRelService.baseCreate(req.body))}catch(err){next(err)}
		})
		// 删除课程信息+ 小节信息
		router.delete('/schedule/delete', async (req, res, next) => {
			try{res.json(await itemService.baseDelete(req.body))}catch(err){next(err)}
		})
		// 教师添加小节的视频 pdf等上传的资料
		router.post('/file/create', async (req, res, next) => {
			try{res.json(await fileService.baseCreate(req.body))}catch(err){next(err)}
		})
		// 教师添加小节的考试信息
		// router.post('/schedule/test/create', (req, res, next) => {
		// 	try{res.json(testService.testAndAnswerCreate(req.query))}catch(err){next(err)}
		// })
		// 教师查询该小节订阅该课程该小节的该考试题即testNo的学生们的答题信息
		// 小节的视频和pdf等信息
		router.get('/file/find', async (req, res, next) => {
			try{res.json(await fileService.baseFindByFilter(null, req.query))}catch(err){next(err)}
		})
		// 小节的视频和pdf等信息
		router.delete('/file/delete', async (req, res, next) => {
			try{res.json(await fileService.baseDelete(req.body))}catch(err){next(err)}
		})
		// 该小节的试卷信息
		router.get('/test/find', async (req, res, next) => {
			try{res.json(await testService.baseFindByFilter(null, req.query))}catch(err){next(err)}
		})
		router.post('/test/create', async (req, res, next) => {
			try{res.json(await testService.baseCreate(req.body))}catch(err){next(err)}
		})
		// 试卷的具体题目和选项
		router.get('/itemAndAnswer/find', (req, res, next) => {
			var testId = req.query.testId;
			testItemService.baseFindByFilter(null, req.query).then((d)=>{
				if(d&&d.length>0){
					d.map((_d)=>{
						answerService.baseFindByFilter(null,{ itemId:_d.itemId }).then((chooseList)=>{
							d.chooseList = chooseList;
						})
					})
				}
				res.json({success: true, data:d});
			})
		})
		// 学生提交考试答案，记录考试历史表，并给出正确率
		// 学生选择已经考完试的试卷，查看记录
		// 学生或者老师发布论坛信息
		router.post('/message/create', async (req, res, next) => {
			try{res.json(await messageService.baseCreate(req.body))}catch(err){next(err)}
		})
		// 学生或者老师查询论坛信息 包括论坛内容和评论
		router.get('/message/findAll', async (req, res, next) => {
			try{res.json(await messageService.baseFindAll())}catch(err){next(err)}
		})
		router.get('/back/find', async (req, res, next) => {
			try{res.json(await backService.baseFindByFilter(null, req.query))}catch(err){next(err)}
		})
		// 学生或老师评论信息
		router.post('/back/create', async (req, res, next) => {
			try{res.json(await backService.baseCreate(req.body))}catch(err){next(err)}
		})
		/***************查询业务***************/
		router.get('/all', async (req, res, next) => {
			try{res.json(await companyService.baseFindAll())}catch(err){next(err)}
		})
		router.put('/update', async (req, res, next) => {
			try{res.json(await companyService.baseUpdate(req.body['update'], req.body['where']))}catch(err){next(err)}
		})
		router.delete('/delete', async (req, res, next) => {
			try{res.json(await companyService.baseDelete(req.body))}catch(err){next(err)}
		})

		router.post('/createBatch', async (req, res, next) => {
			try{res.json(await companyService.baseCreateBatch(req.body['entitys']))}catch(err){next(err)}
		})
		return router
	}
}
module.exports = CommonCtroller.initRouter()