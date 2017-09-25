<template>
  <div>
    <h1>Books</h1>
    <p>Your book collection.</p>
    <router-link class="btn btn-primary" to="/books-add">Add Books to your collection</router-link>
    <hr/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div v-else>{{books}}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        books: null,
        loading: true
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    created () { },
    methods: {
      getBooks () {
        axios.get(this.getAPI.url + '/api/books/self').then(res => {
          this.books = res.data
        }).catch(err => {
          console.log('unable to get books', err)
        }).then(() => {
          this.loading = false
        })
      }
    },
    mounted () {
      this.getBooks()
    }
  }
</script>

<style>

</style>
