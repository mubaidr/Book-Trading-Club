<template>
  <div>
    <h1>Books</h1>
    <p>Your book collection.</p>
    <router-link class="btn btn-primary" to="/books-add">Add Books to your collection</router-link>
    <hr/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div class="row" v-else>
      <div class="col-md-2" v-for="book in books" :key="book._id">
        <div class="book">
          <img alt="thumbnail" :title="book.title" :src="book.thumbnail" />
          <!-- <p class="text-success">{{book.volumeInfo.title}}</p><span class="text-muted">{{getAuthors(book.volumeInfo.authors)}}</span> -->
        </div>
      </div>
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
          console.log(err)
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
