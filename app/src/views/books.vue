<template>
  <div>
    <h1>Books</h1>
    <p>Available book collection. You can select any book to request a trade. </p>
    <hr/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div class="row" v-else>
      <div class="col-md-2" v-for="book in books" :key="book._id">
        <div class="book trade-enable">
          <div class="trade-controls" @click="tradeBook(book)">
            <i class="fa fa-exchange" aria-hidden="true"></i>
          </div>
          <img alt="thumbnail" :title="book.title" :src="book.thumbnail" />
          <!-- <p class="text-success">{{book.volumeInfo.title}}</p><span class="text-muted">{{getAuthors(book.volumeInfo.authors)}}</span> -->
        </div>
      </div>
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
      ...mapGetters(['getAPI'])
    },
    created () { },
    methods: {
      tradeBook (book) {
        console.log(book)
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
