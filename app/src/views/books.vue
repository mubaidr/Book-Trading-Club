<template>
  <div>
    <h1>Books</h1>
    <p>Available book collection. You can select any book to request a trade. </p>
    <hr/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div class="row" v-else>
      <template v-if="books && books.length > 0">
        <div class="col-md-2" v-for="book in books" :key="book._id">
          <div class="book trade-enable">
            <div class="trade-controls" @click="tradeBook(book)">
              <i class="fa fa-exchange" aria-hidden="true"></i>
            </div>
            <img alt="thumbnail" :title="book.title" :src="book.thumbnail" />
            <!-- <p class="text-success">{{book.volumeInfo.title}}</p><span class="text-muted">{{getAuthors(book.volumeInfo.authors)}}</span> -->
          </div>
        </div>
      </template>
      <template v-else>
        <div class="alert alert-dismissible alert-info">
          <strong>Oops!</strong>
          <p>No books found!</p>
        </div>
        <router-link to="/books-add">Click here</router-link> to add books.
      </template>
    </div>
  </div>
</template>

<script>
  import router from './../utilities/router'
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
      ...mapGetters(['getAPI', 'isAuthenticated'])
    },
    created () { },
    methods: {
      tradeBook (book) {
        if (this.isAuthenticated) {
          axios.post(this.getAPI.url + '/api/trades/', {
            book_id: book._id,
            owner_id: book.owner_id
          }).then(() => {
            router.push('/trades')
          }).catch(err => {
            console.log(err)
          })
        } else {
          router.push('/login/?return=' + this.$route.fullPath)
        }
      },
      getBooks () {
        axios.get(this.getAPI.url + '/api/books/').then(res => {
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
