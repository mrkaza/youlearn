import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Learn from '../views/Learn.vue'
import Verify from '../views/Verify.vue'

Vue.use(VueAxios,axios)


Vue.use(VueRouter)

const routes = [
  {
    path: '/verify-email',
    name: 'verify',
    component: Verify,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/learn/:video_id',
    name: 'learn',
    component: Learn,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if(user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
