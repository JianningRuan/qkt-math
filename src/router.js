import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/home/Index.vue'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'practiceHome',
          component: () => import(/* webpackChunkName: "home" */ './views/home/PracticeHome.vue'),
          children: [
            {
              path: '/',
              redirect: 'mathPractice'
            },
            {
              path: 'mathPractice',
              name: 'MathPractice',
              component: () => import(/* webpackChunkName: "home" */ './views/mathPractice/MathPractice.vue')
            },
            {
              path: 'wordPractice',
              name: 'wordPractice',
              component: () => import(/* webpackChunkName: "wordHome" */ './views/reciteWord/WordPractice.vue')
            },
            {
              path: 'cnWordPractice',
              name: 'cnWordPractice',
              component: () => import(/* webpackChunkName: "wordHome" */ './views/cnWord/WordPractice.vue')
            }
          ]
        },
        {
          path: 'findHome',
          name: 'findHome',
          component: () => import(/* webpackChunkName: "find" */ './views/home/FindHome.vue')
        }
      ]
    },
    {
      path: '/allTaskList',
      name: 'AllTaskList',
      component: () => import(/* webpackChunkName: "task" */ './views/task/AllTaskList.vue')
    },
    {
      path: '/taskDetail',
      name: 'TaskDetail',
      component: () => import(/* webpackChunkName: "task" */ './views/task/TaskDetail.vue')
    },
    {
      path: '/taskHistory',
      name: 'TaskHistory',
      component: () => import(/* webpackChunkName: "task" */ './views/task/TaskHistory.vue')
    },
    {
      path: '/challenge',
      name: 'Challenge',
      component: () => import(/* webpackChunkName: "challenge" */ './views/challenge/Index.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import(/* webpackChunkName: "challenge" */ './views/challenge/Test.vue')
    },
    {
      path: '/practice',
      name: 'Practice',
      component: () => import(/* webpackChunkName: "challenge" */ './views/challenge/Practice.vue')
    },
    {
      path: '/testWelcome',
      name: 'TestWelcome',
      component: () => import(/* webpackChunkName: "test" */ './views/test/TestWelcome.vue')
    },
    {
      path: '/testResult',
      name: 'TestResult',
      component: () => import(/* webpackChunkName: "test" */ './views/test/TestResult.vue')
    },
    {
      path: '/book',
      name: 'Book',
      component: () => import(/* webpackChunkName: "book" */ './views/book/Book.vue')
    },
    {
      path: '/bookDetail',
      name: 'BookDetail',
      component: () => import(/* webpackChunkName: "book" */ './views/book/BookDetail.vue')
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import(/* webpackChunkName: "rank" */ './views/rank/Rank.vue')
    },
    {
      path: '/level',
      name: 'Level',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "level" */ './views/level/Level.vue')
    },
    {
      path: '/power',
      name: 'Power',
      component: () => import(/* webpackChunkName: "level" */ './views/level/Power.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ './views/login/Login.vue')
    },
    {
      path: '/personalData',
      name: 'PersonalData',
      component: () => import(/* webpackChunkName: "login" */ './views/login/PersonalData.vue')
    },
    {
      path: '/data',
      name: 'Data',
      meta: { title: '个人资料' },
      component: () => import(/* webpackChunkName: "my" */ './views/my/Data.vue')
    },
    {
      path: '/feedback',
      name: 'Feedback',
      meta: { title: '帮助与反馈' },
      component: () => import(/* webpackChunkName: "my" */ './views/my/Feedback.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "break" */ './views/my/About.vue')
    },
    {
      path: '/beeCalendar',
      name: 'BeeCalendar',
      component: () => import(/* webpackChunkName: "bee" */ './views/bee/BeeCalendar.vue')
    },
    {
      path: '/bee',
      name: 'Bee',
      component: () => import(/* webpackChunkName: "bee" */ './views/bee/Bee.vue')
    },
    {
      path: '/courseSeries',
      name: 'courseSeries',
      meta: { title: '系列视频' },
      component: () => import(/* webpackChunkName: "video" */ './views/video/series.vue')
    },
    {
      path: '/courseList',
      name: 'courseList',
      meta: { title: '课程列表' },
      component: () => import(/* webpackChunkName: "video" */ './views/video/list.vue')
    },
    {
      path: '/videoDetail',
      name: 'videoDetail',
      meta: { title: '视频详情' },
      component: () => import(/* webpackChunkName: "video" */ './views/video/detail.vue')
    },
    {
      path: '/activityDetail',
      name: 'ActivityDetail',
      component: () => import(/* webpackChunkName: "activity" */ './views/activity/ActivityDetail.vue')
    },
    {
      path: '/checkin',
      name: 'checkin',
      meta: { title: '签到' },
      component: () => import(/* webpackChunkName: "checkin" */ './views/checkin/checkin.vue')
    },
    {
      path: '/reply',
      name: 'Reply',
      meta: { title: '评论' },
      component: () => import(/* webpackChunkName: "reply" */ './views/activity/Reply.vue')
    },
    {
      path: '/myHome',
      name: 'MyHome',
      meta: { title: '个人中心' },
      component: () => import(/* webpackChunkName: "center" */ './views/home/MyHome.vue')
    },
    {
      path: '/msgList',
      name: 'MsgList',
      meta: { title: '消息中心' },
      component: () => import(/* webpackChunkName: "center" */ './views/my/MsgList.vue')
    },
    {
      path: '/msgDetail',
      name: 'MsgDetail',
      meta: { title: '消息详情' },
      component: () => import(/* webpackChunkName: "center" */ './views/my/MsgDetail.vue')
    },
    {
      path: '/errorReport',
      name: 'ErrorReport',
      meta: { title: '错题本' },
      component: () => import(/* webpackChunkName: "center" */ './views/my/ErrorReport.vue')
    },
    {
      path: '/selectUser',
      name: 'SelectUser',
      meta: { title: '切换用户' },
      component: () => import(/* webpackChunkName: "center" */ './views/my/SelectUser.vue')
    },
    {
      path: '/microDetail',
      name: 'MicroDetail',
      meta: { title: '微课' },
      component: () => import(/* webpackChunkName: "micro" */ './views/micro/MicroDetail.vue')
    },
    {
      path: '/wordBook',
      name: 'WordBook',
      meta: { title: '切换单词书' },
      component: () => import(/* webpackChunkName: "word" */ './views/reciteWord/WordBook.vue')
    },
    {
      path: '/wordBookDetail',
      name: 'WordBookDetail',
      meta: { title: '书本详情' },
      component: () => import(/* webpackChunkName: "word" */ './views/reciteWord/BookDetail.vue')
    },
    {
      path: '/wordList',
      name: 'WordList',
      meta: { title: '单词本' },
      component: () => import(/* webpackChunkName: "word" */ './views/reciteWord/WordList.vue')
    },
    {
      path: '/wordCard',
      name: 'WordCard',
      meta: { title: '单词学习' },
      component: () => import(/* webpackChunkName: "card" */ './views/reciteWord/WordCard.vue')
    },
    {
      path: '/cnWordCard',
      name: 'CnWordCard',
      meta: { title: '生词学习' },
      component: () => import(/* webpackChunkName: "cnCard" */ './views/cnWord/WordCard.vue')
    },
    {
      path: '/cnWordBook',
      name: 'CnWordBook',
      meta: { title: '教材选择' },
      component: () => import(/* webpackChunkName: "cnWord" */ './views/cnWord/WordBook.vue')
    },
    {
      path: '/cnWordBookDetail',
      name: 'CnWordBookDetail',
      meta: { title: '教材详情' },
      component: () => import(/* webpackChunkName: "cnWord" */ './views/cnWord/BookDetail.vue')
    },
    {
      path: '/cnWordList',
      name: 'CnWordList',
      meta: { title: '错词统计' },
      component: () => import(/* webpackChunkName: "cnWord" */ './views/cnWord/WordList.vue')
    }
  ],
  scrollBehavior: () => ({ y: 0 })
})
