export default {
  getToken() {
    return JSON.parse(window.localStorage.getItem('token'))
  },
  setToken(obj) {
    window.localStorage.setItem('token', JSON.stringify(obj))
  },
  getUser() {
    return JSON.parse(window.localStorage.getItem('userinfo'))
  },
  setUser(obj) {
    window.localStorage.setItem('userinfo', JSON.stringify(obj))
  },
  clear() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userinfo')
  }
}
