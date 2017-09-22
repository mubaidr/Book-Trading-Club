import Vue from 'vue'
import App from './views/app.vue'

import router from './utilities/router'
import store from './utilities/store'

import {
  sync
} from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

export {
  app
}
