<template>
  <div>
    <h1>Books</h1>
    <p>Available book collection. You can select any book to request a trade. </p>
    <hr/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 100%"></div>
    </div>
    <div v-else>
      <template v-if="books && books.length > 0">
        <div class="row">
          <div class="col-md-2 col-sm-3 col-xs-6" v-for="book in books" :key="book._id">
            <div class="book">
              <div class="controls">
                <i class="fa fa-exchange text-info" aria-hidden="true" @click="tradeBook(book)" title="Request"></i>
              </div>
              <img alt="thumbnail" :title="book.title" :src="book.thumbnail" />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="alert alert-info">
          <h3>Oops!</h3>
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
            book: book._id,
            owner: book.owner
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
