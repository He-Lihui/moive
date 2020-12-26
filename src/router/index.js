import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 引入路由模块化文件
import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema' 
import filmRouter from './routes/film'
import detailRouter from './routes/detail'
import cityRouter from './routes/city'

const routes = [
  {
    path: '/',
    // 访问跟路由，进行重定向
    redirect: '/film'
  },
  centerRouter,
  cinemaRouter,
  filmRouter,
  detailRouter,
  cityRouter
]

const router = new VueRouter({
  mode: 'history',
// base: process.env.BASE_URL,
  routes
})

export default router
