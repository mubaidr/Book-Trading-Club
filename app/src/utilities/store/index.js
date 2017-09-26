import Vue from 'vue'
import Vuex from 'vuex'
import session from './session'
import api from '../../api'

Vue.use(Vuex)

const state = {
  token: session.getToken(),
  user: session.getUser(),
  api: api
}

const mutations = {
  setAuthentication(state, token) {
    state.token = token
    session.setToken(token)
  },
  setUserInfo(state, user) {
    state.user = user
    session.setUser(user)
  },
  removeAuthentication(state) {
    state.token = null
    state.user = null
    session.clear()
  },
  setAuthAndUser(state, obj) {
    let token = obj.token
    let user = obj.user

    session.setToken(token)
    session.setUser(user)

    state.token = token
    state.user = user
  }
}

const actions = {}

const getters = {
  getToken(state) {
    return state.token
  },
  isAuthenticated(state) {
    return state.token !== null && typeof state.token !== 'undefined'
  },
  getUser(state) {
    return state.user
  },
  getAPI(state) {
    return state.api
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
