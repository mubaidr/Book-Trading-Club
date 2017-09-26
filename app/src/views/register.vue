<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6">
      <form class="form-horizontal">
        <fieldset>
          <legend>Register</legend>
          <div class="form-group">
            <label for="inputEmail" class="col-lg-3 control-label">Username</label>
            <div class="col-lg-9">
              <input type="text" class="form-control" placeholder="username" v-model="form.username">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="col-lg-3 control-label">Password</label>
            <div class="col-lg-9">
              <input type="password" class="form-control" placeholder="Password" v-model="form.password">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="col-lg-3 control-label">Confirm Password</label>
            <div class="col-lg-9">
              <input type="password" class="form-control" placeholder="Confirm Password" v-model="form.passwordConfirm">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-9 col-lg-offset-3">
              <button type="button" class="btn btn-primary" @click.prevent.stop="register">Register</button>
              <router-link to="/login">Already have an account?</router-link>
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
          password: '',
          passwordConfirm: ''
        }
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      register () {
        axios.post(this.getAPI.url + '/auth/register', this.form).then(res => {
          if (res.data.success) {
            store.commit('setAuthAndUser', {
              token: res.data.token,
              user: res.data.user
            })

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

