import Vue from 'vue'
import Router from 'vue-router'
// @表示的src的绝对路由
import Home from '@/components/Home'
import Login from '@/components/Login'
import Users from '@/components/Users'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})

// 给router对象注册导航守卫
// to: 要去哪儿
// from: 从哪儿来
// next: 是否放行   next(): 方向  next('/login')  next('/home')
router.beforeEach((to, from, next) => {
  // 如果是去登录的，放行
  // console.log('to', to)
  // console.log('from', from)
  if (to.path === '/login') {
    next()
    return
  }
  // 如果不是登录的，判断是否有token，如果有，放走
  // 如果没有，去登录
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
  // console.log('哈哈哈，你被我拦住了吧')
})

export default router
