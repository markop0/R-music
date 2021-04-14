import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/mainHome' },

  // { path: '/mainHome', component: () => import('../components/mainHome.vue') },

  {
    path: '/mainHome', component: () => import('../components/mainHome.vue'),
    redirect: '/home1',
    children: [
      { path: '/home1', component: () => import('../components/home1.vue') },
      { path: '/home2', component: () => import('../components/home2.vue') },
      { path: '/home3', component: () => import('../components/home3.vue') },
      { path: '/search', component: () => import('../components/search.vue') },
      { path: '/play', component: () => import('../components/play.vue') },
      { path: '/loging', component: () => import('../components/loging.vue') },
      { path: '/artists', component: () => import('../components/artists.vue') },
      { path: '/musicList', component: () => import('../components/musicList.vue') },
      { path: '/paihang', component: () => import('../components/paihang.vue') },
      { path: '/me', component: () => import('../components/me.vue') },
      { path: '/menu', component: () => import('../components/menu.vue') },
      { path: '/video', component: () => import('../components/video.vue') },
      { path: '/everydayDaily', component: () => import('../components/everydayDaily.vue') },
      { path: '/musicCtrl', component: () => import('../components/musicCtrl.vue') },
      // { path: '/home1/musicList', component: () => import('../components/home1.vue') },
      // { path: '/menu', component: () => import('../components/menu.vue') },


    ]
  },

]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') return next()
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (tokenStr === null || tokenStr === false) return next('/login')
//     next()
// })

export default router


// import Vue from 'vue'
// import Router from 'vue-router'
// import home1 from '@/components/home1'
// import home2 from '@/components/home2'
// import home3 from '@/components/home3'
// import search from '@/components/search'
// import play from '@/components/play'
// import loging from '@/components/loging'
// import artists from '@/components/artists'
// import musicList from '@/components/musicList'
// import paihang from '@/components/paihang'
// import me from '@/components/me'
// import menu from '@/components/menu'
// import video from '@/components/video'
// import everydayDaily from '@/components/everydayDaily'
// import musicCtrl from '@/components/musicCtrl'

// Vue.use(Router)

// export default new Router({
//   mode: 'history',//可以是去掉#号
//   routes: [
//     //所有没有找到时候，去地址/home1的组件
//     {
//       path: "*",
//       redirect: home1
//     },
//     {
//       path: '/',
//       component: home1
//     },
//     {
//       path: '/home1',
//       component: home1,
//       children: [
//         {
//           path: 'musicList',
//           component: musicList
//         }
//       ]
//     },
//     {
//       path: '/home2',
//       component: home2,
//       children: [
//         {
//           path: '/home2/paihang',
//           component: paihang
//         },
//       ]
//     },
//     {
//       path: '/home3',
//       component: home3
//     },
//     {
//       path: '/search',
//       component: search
//     },
//     {
//       path: '/play',
//       component: play
//     },
//     {
//       path: '/loging',
//       component: loging
//     },
//     {
//       path: '/artists',
//       component: artists
//     },
//     {
//       path: '/me',
//       component: me
//     },
//     {
//       path: '/musicList',
//       component: musicList
//     },
//     {
//       path: '/menu',
//       component: menu
//     },
//     {
//       path: '/video',
//       component: video
//     },
//     {
//       path: '/everydayDaily',
//       component: everydayDaily
//     },

//   ]

// })


