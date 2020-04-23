import express from 'express'
var mysqldb = require('../config/mysqldb.js')
var app = express();
var multer  = require('multer');
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/upload");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: Storage }).single("imgUploader"); //Field name and max count

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
class CommonCtroller {
    static initRouter() {
        // 登录
        router.get('/login', async(req, res, next) => {
                try { res.json(await userService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
            })
            // 注册
        router.post('/createUser', async(req, res, next) => {
                try { res.json(await userService.baseCreate(req.body)) } catch (err) { next(err) }
            })
            // 查询下拉框内容
        router.get('/dictParam/where', async(req, res, next) => {
                try { res.json(await dictService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
            })
            // 查询教师课程列表 + 查询课程下面的小节信息
        router.get('/schedule/find', async(req, res, next) => {
                try { res.json(await itemService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
            })
            // 查询学生课表列表 
        router.get('/schedule/findByS', (req, res, next) => {
            mysqldb.query('select * from scheduleItems where id in (select scheduleId from scheduleUserRels where userId = ?) and scheduleType = 1 ',
                [req.query.userId],(err, rows, fields)=>{
                    res.json(rows)
                })
            })
        //查询该学生能看见的所有课程 -- 通过老师名或者课程名查询
        router.get('/schedule/findByName', (req, res, next) => {
            let sqlStr = 'select a.scheduleName,b.name,a.id  '
                        +'from scheduleItems a ,users b  '
                        +'where a.userId = b.id and  a.id not in (select scheduleId from scheduleUserRels where userId = ?) and a.scheduleType = 1'
            // if(req.query.queryName&&req.query.queryName!=''){
            //     sqlStr+='and ( a.scheduleName like \'%'+req.query.queryName+'%\' or b.name like \'%'+req.query.queryName+'%\')'
            // }
            mysqldb.query(sqlStr,[req.query.userId],(err, rows, fields)=>{
                    res.json(rows)
                })
            })
            // 创建该课程--教师
        router.post('/schedule/create', async(req, res, next) => {
                try { res.json(await itemService.baseCreate(req.body)) } catch (err) { next(err) }
            })
            // 加入该课程--学生
        router.post('/schedule/joinSchedule', async(req, res, next) => {
                try { res.json(await scheUserRelService.baseCreate(req.body)) } catch (err) { next(err) }
            })
            // 删除课程信息+ 小节信息
        router.delete('/schedule/delete', async(req, res, next) => {
            let sqlStr = 'delete from scheduleItems where id = '+req.body.id
            mysqldb.query(sqlStr,(err, rows, fields)=>{
                if(err){ console.log(err)}
                    res.json(rows)
                })
        })
            // 教师添加小节的视频 pdf等上传的资料
        router.post('/file/create', async(req, res, next) => {
                try { res.json(await fileService.baseCreate(req.body)) } catch (err) { next(err) }
            })
            // 教师查询该小节订阅该课程该小节的该考试题即testNo的学生们的答题信息
            // 小节的视频和pdf等信息
        router.get('/file/find', async(req, res, next) => {
                try { res.json(await fileService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
            })
            // 小节的视频和pdf等信息
        router.delete('/file/delete', async(req, res, next) => {
                try { res.json(await fileService.baseDelete(req.body)) } catch (err) { next(err) }
            })
            // 该小节的试卷信息
        router.get('/test/find', async(req, res, next) => {
            try { res.json(await testService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
        })
        router.post('/test/create', async(req, res, next) => {
                try { res.json(await testService.baseCreate(req.body)) } catch (err) { next(err) }
            })
            // 试卷的具体题目和选项
        router.get('/itemAndAnswer/find', async(req, res, next) => {
            let sqlStr = 'select a.testId,a.itemName,a.id as itemId,b.id as answerId,b.answerName,b.isTrue from testItemInfos a,testAnswerInfos b,testInfos c '
            +'where a.id = b.itemId and c.scheduleItemId = ? and c.id = a.testId'
            if(req.query.testId&&req.query.testId!=''){
                sqlStr= sqlStr+ " and  c.id="+req.query.testId
            }
            mysqldb.query(sqlStr,
                [req.query.scheduleItemId],(err, rows, fields)=>{
                    res.json(rows)
                })
        })
            // 学生提交考试答案，记录考试历史表，并给出正确率
        router.post('/itemAndAnswer/create', async(req, res, next) => {
                try { res.json(await testHisService.itemAndAnswerCreate(req.body)) } catch (err) { next(err) }
            })
            // 教师添加小节的考试信息
        router.post('/schedule/test/create', (req, res, next) => {
                try { res.json(testService.testAndAnswerCreate(req.body)) } catch (err) { next(err) }
            })
            // 根据userId查询考试内容题目
        router.get('/itemAndAnswer/findHisByUserId', async(req, res, next) => {
                try { res.json(await testHisService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
            })
            // 教师查询该考试题目的考过试的学生
        router.get('/itemAndAnswer/findUserList', async(req, res, next) => {
            mysqldb.query('select DISTINCT a.userId,b.name,a.score from testUserHis a,users b where a.userId = b.id and scheduleItemId=?',
                [req.query.scheduleItemId],(err, rows, fields)=>{
                    res.json(rows)
                })
            // try { res.json(await testHisService.findUserList(null, req.query)) } catch (err) { next(err) }
        })
        router.get('/itemAndAnswer/findHisByUserId', async(req, res, next) => {
            mysqldb.query('select a.testId,a.itemName,b.id,b.answerName,b.isTrue,c.answerId from testItemInfos a,testAnswerInfos b'+
            'LEFT JOIN testUserHis c on b.itemId = c.itemId and c.userId = ? and c.testId=? where a.id = b.itemId and a.testId = c.testId',
                [req.query.userId,req.query.testId],(err, rows, fields)=>{
                    res.json(rows)
                })

            })
            // 学生选择已经考完试的试卷，查看记录
            // 学生或者老师发布论坛信息
        router.post('/message/create', async(req, res, next) => {
                try { res.json(await messageService.baseCreate(req.body)) } catch (err) { next(err) }
            })
            // 学生或者老师查询论坛信息 包括论坛内容和评论
        router.get('/message/findAll', async(req, res, next) => {
            let sqlStr = 'select b.id,u.name,b.messageInfo,b.createdAt from messages b ,users u where b.userId = u.id order by b.createdAt DESC'
            mysqldb.query(sqlStr,(err, rows, fields)=>{
                    res.json(rows)
                })
            // try { res.json(await messageService.baseFindAll()) } catch (err) { next(err) }
        })
        router.get('/back/find', async(req, res, next) => {
                try { res.json(await backService.baseFindByFilter(null, req.query)) } catch (err) { next(err) }
            })
        router.get('/backInfo/find', async(req, res, next) => {
            let sqlStr = 'select b.id,u.name,b.backInfo from messageBacks b ,users u where b.userId = u.id and messageId = ? ORDER BY b.createdAt;'
            mysqldb.query(sqlStr,[req.query.messageId],(err, rows, fields)=>{
                    res.json(rows)
                })
            })
            // 学生或老师评论信息
        router.post('/back/create', async(req, res, next) => {
                try { res.json(await backService.baseCreate(req.body)) } catch (err) { next(err) }
            })
        // 上传文件
        router.post('/upload', function(req, res, next){
            upload(req, res, function (err) {
                if (err) {
                    return res.json("Something went wrong!");
                }
                return res.json({code:'0000',name:req.file.filename});
            });
        });
        // router.post('/upload', function(req, res){//发送 json 数据到这个路由
        //      // 获得文件的临时路径
        //     var tmp_path = req.files.imgUploader.path;
        //     upload(req, res, function (err) {        if (err) {            return res.json("Something went wrong!");
        //         }        return res.json("File uploaded sucessfully!.");
        //     });
        //     //   let oldName = req.files.imgUploader.path;
        //     //   let newName = './public/upload/'+req.files.imgUploader.name;
        //     // console.log(oldName)
        //     // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
        //     // console.log(newName)
        //     //   fs.renameSync(oldName, oldName);
        //     //   res.json("File uploaded sucessfully!.");
        // })

            /***************查询业务***************/
        router.get('/all', async(req, res, next) => {
            try { res.json(await companyService.baseFindAll()) } catch (err) { next(err) }
        })
        router.put('/update', async(req, res, next) => {
            try { res.json(await companyService.baseUpdate(req.body['update'], req.body['where'])) } catch (err) { next(err) }
        })
        router.delete('/delete', async(req, res, next) => {
            try { res.json(await companyService.baseDelete(req.body)) } catch (err) { next(err) }
        })

        router.post('/createBatch', async(req, res, next) => {
            try { res.json(await companyService.baseCreateBatch(req.body['entitys'])) } catch (err) { next(err) }
        })
        return router
    }
}
module.exports = CommonCtroller.initRouter()