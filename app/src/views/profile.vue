<template>
  <div>
    <h1>Profile</h1>
    <p></p>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div v-else>
      {{user}} {{getUser}}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import api from '../api'

  export default {
    data () {
      return {
        user: null,
        loading: false
      }
    },
    computed: {
      ...mapGetters(['getUser'])
    },
    created () { },
    methods: {
      updateProfile () {
        axios.post(api.url + '/api/users/' + id).then(res => {
          this.user = res.data
        }).catch(err => {
          console.log('unable to get books', err)
        }).then(() => {
          this.loading = false
        })
      }
    }, mounted () {
      this.getBook()
    }
  }
</script>

<style>

</style>
