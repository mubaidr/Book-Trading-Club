import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(cfg => {
  const token = store.getters.getToken
  if (token) {
    cfg.headers['x-access-token'] = token
  }
  return cfg
}, err => {
  return Promise.reject(err)
})

export default axios
