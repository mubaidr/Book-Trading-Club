<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6">
      <form class="form-horizontal">
        <fieldset>
          <legend>Login</legend>
          <div class="form-group">
            <label for="inputEmail" class="col-lg-4 control-label">Username</label>
            <div class="col-lg-8">
              <input type="text" class="form-control" placeholder="username" v-model="form.username">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="col-lg-4 control-label">Password</label>
            <div class="col-lg-8">
              <input type="password" class="form-control" placeholder="Password" v-model="form.password">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-8 col-lg-offset-4">
              <button type="button" class="btn btn-primary" @click.prevent.stop="login">Login</button>
              <router-link to="/register">Don't have an account?</router-link>
              <router-link to="/home">Cancel</router-link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '../utilities/router'
  import store from '../utilities/store'
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      login () {
        axios.post(this.getAPI.url + '/auth/login', this.form).then(res => {
          if (res.data.success) {
            store.commit('setAuthentication', res.data.token)
            store.commit('setUserInfo', res.data.user)

            setTimeout(() => {
              router.push(this.$route.query.return || '/home')
            }, 250)
          } else {
            alert(res.data.error)
          }
        }).catch(() => {
          alert('Error! Please try again.')
        })
      }
    }
  }
</script>

<style>

</style>

