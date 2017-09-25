<template>
  <div>
    <h1>Books</h1>
    <p>Add books to your collection.</p>
    <hr/>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">Book info:</span>
        <input type="text" class="form-control" placeholder="In Search of Lost Time, Hamlet, To Kill a Mockingbird" v-model="book">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button" :disabled="book.length < 3" @click="findBook">Find</button>
        </span>
      </div>
    </div>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 100%">Searching for books...</div>
    </div>
    <div class="row" v-else>
      <div class="col-md-2" v-for="book in books" :key="book.id">
        <div class="book" @click="addBook(book)">
          <img alt="thumbnail" :title="book.volumeInfo.title" :src="book.volumeInfo.imageLinks.thumbnail" />
          <p class="text-success">{{book.volumeInfo.title}}</p>
          <span class="text-muted">{{getAuthors(book.volumeInfo.authors)}}</span>
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
        book: 'Hamlet',
        books: null,
        loading: false
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
      findBook () {
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
  .book {
    padding: 5px;
    background-color: #2c3e50;
    cursor: pointer;
    transition: box-shadow 0.25s ease-out;
    text-align: center;
    border-radius: 3px;
  }

  .book:hover {
    box-shadow: 0 0 5px #2c3e50;
  }

  .book img {
    width: 100%;
    height: auto;
    border-radius: 3px;
  }

  .book p {
    padding-top: 15px;
    font-weight: bold;
    font-size: 1.25em;
  }
</style>
