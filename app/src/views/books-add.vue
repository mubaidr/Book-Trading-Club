<template>
  <div>
    <h1>Books</h1>
    <p>Add books to your collection.</p>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">Book info:</span>
        <input type="text" class="form-control" placeholder="In Search of Lost Time, Hamlet, To Kill a Mockingbird" v-model="book" @keyup.enter="findBook">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button" :disabled="book.length < 3" @click="findBook">Find</button>
        </span>
      </div>
    </div>
    <br/>
    <div class="alert alert-dismissible alert-success" v-show="success">
      <strong>Success!</strong> Book added to your collection.
    </div>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 100%">Searching for books...</div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12">
        <p v-if="books && books.length>0">Please choose a book from below results:</p>
        <p v-else>You can search a book either by title or author name.</p>
      </div>
      <div class="col-md-2" v-for="book in books" :key="book.id" v-if="book.volumeInfo.imageLinks">
        <div class="book add" @click="addBook(book)">
          <img alt="thumbnail" :title="book.volumeInfo.title" :src="book.volumeInfo.imageLinks.thumbnail" />
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
        book: '',
        books: null,
        loading: false,
        success: false
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    created () { },
    methods: {
      getAuthors (arr) {
        return arr ? arr.join(', ') : ''
      },
      addBook (book) {
        axios.post(this.getAPI.url + '/api/books', {
          title: book.volumeInfo.title,
          author: this.getAuthors(book.volumeInfo.authors),
          thumbnail: book.volumeInfo.imageLinks.thumbnail
        }).then(() => {
          this.book = ''
          this.books = []
          this.success = true
        }).catch(err => {
          console.log(err)
        })
      },
      findBook () {
        this.success = false
        this.loading = true
        axios.get(this.getAPI.books.url + this.book).then(res => {
          this.books = res.data.items
        }).catch(err => {
          console.log(err)
        }).then(() => {
          this.loading = false
        })
      }
    }, mounted () { }
  }
</script>

<style>

</style>
