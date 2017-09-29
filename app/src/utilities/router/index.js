import Vue from 'vue'
import store from './../store'
import Router from 'vue-router'

import _404 from './../../views/404.vue'
import home from './../../views/home.vue'
import register from './../../views/register.vue'
import profile from './../../views/profile.vue'
import login from './../../views/login.vue'
import booksSelf from './../../views/books-self.vue'
import booksAdd from './../../views/books-add.vue'
import books from './../../views/books.vue'
import trades from './../../views/trades.vue'

Vue.use(Router)

const router = new Router({
  base: '/',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home
  }, {
    path: '/profile',
    component: profile,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/register',
    component: register
  }, {
    path: '/login',
    component: login
  }, {
    path: '/books-self',
    component: booksSelf,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/books-add',
    component: booksAdd,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/books',
    component: books
  }, {
    path: '/trades',
    component: trades,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/404',
    component: _404
  }, {
    path: '*',
    redirect: '/404'
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    router.push('/login/?return=' + to.fullPath)
  } else {
    next()
  }
})

export default router
