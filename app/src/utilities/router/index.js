import Vue from 'vue'
import store from './../store'
import Router from 'vue-router'

import home from './../../views/home.vue'
import register from './../../views/register.vue'
import login from './../../views/login.vue'
import _404 from './../../views/404.vue'
import booksSelf from './../../views/books-self.vue'
import books from './../../views/books.vue'
import book from './../../views/book.vue'

Vue.use(Router)

const router = new Router({
  base: '/Open-Book-Store/',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home
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
    path: '/books/:id',
    component: book
  }, {
    path: '/books',
    component: books
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
