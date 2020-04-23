import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
import main from '../views/main'
import signin from '../views/signin'
import courseList from '../views/courseinfo/courseList'
import courseAddByT from '../views/courseinfo/courseAddByT'
import courseAddByS from '../views/courseinfo/courseAddByS'
import courseItemCreate from '../views/courseinfo/courseItemCreate'
import courseItemList from '../views/courseinfo/courseItemList'
import itemFileInfo from '../views/courseinfo/itemFileInfo'
import itemFileCreate from '../views/courseinfo/itemFileCreate'
import testInfo from '../views/courseinfo/testInfo'
import studyWatch from '../views/courseinfo/studyWatch'
import testAnswer from '../views/courseinfo/testAnswer'
import messageList from '../views/message/messageList'
import messageCreate from '../views/message/messageCreate'
import mine from '../views/common/mine'
Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        requireAuth: '0'
      },
      component: main,
      children: [
        {
          path: 'courseList',
          name: 'courseList',
          component: courseList
        },
        {
          path: 'messageList',
          name: 'messageList',
          component: messageList
        },
        {
          path: 'mine',
          name: 'mine',
          component: mine
        },
        {
          path: 'courseAddByT',
          name: 'courseAddByT',
          component: courseAddByT
        },
        {
          path: 'courseAddByS',
          name: 'courseAddByS',
          component: courseAddByS
        },
        {
          path: 'itemFileCreate',
          name: 'itemFileCreate',
          component: itemFileCreate
        },
        {
          path: 'courseItemList',
          name: 'courseItemList',
          component: courseItemList
        },
        {
          path: 'itemFileInfo',
          name: 'itemFileInfo',
          component: itemFileInfo
        },
        {
          path: 'itemFileCreate',
          name: 'itemFileCreate',
          component: itemFileCreate
        },
        {
          path: 'courseItemCreate',
          name: 'courseItemCreate',
          component: courseItemCreate
        },
        {
          path: 'testAnswer',
          name: 'testAnswer',
          component: testAnswer
        },
        {
          path: 'testInfo',
          name: 'testInfo',
          component: testInfo
        },
        {
          path: 'messageCreate',
          name: 'messageCreate',
          component: messageCreate
        },
        {
          path: 'studyWatch',
          name: 'studyWatch',
          component: studyWatch
        }
      ]
    },
    {
      path: '*',
	    redirect: '/login'
    }
  ]
})
export default router;
