<template>
  <div>
    <h1>Book details</h1>
    <p></p>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div v-else>
      {{book}}
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from '../api'

  export default {
    data () {
      return {
        book: null,
        loading: true
      }
    },
    created () { },
    methods: {
      getBook () {
        let id = this.$routes.params.id

        axios.get(api.url + '/api/books/' + id).then(res => {
          this.book = res.data
        }).catch(err => {
          console.log(err)
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
