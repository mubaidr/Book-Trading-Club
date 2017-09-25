<template>
  <div>
    <h1>Books</h1>
    <p>Available book collection. You can also add new books to your collection by entering the book name and rpessing the Add Bokk button.</p>
    <hr/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <div v-else>
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon">Book Title:</span>
          <input type="text" class="form-control" placeholder="In Search of Lost Time, Hamlet, To Kill a Mockingbird" v-model="book">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button" :disabled="book.length < 3" @click="addBook">Add to collection</button>
          </span>
        </div>
      </div>
      <br/> {{books}}
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
        loading: true
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    created () { },
    methods: {
      addBook () {
        axios.get('' + this.book).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      getBooks () {
        axios.get(this.getAPI.url + '/api/books/self').then(res => {
          this.books = res.data
        }).catch(err => {
          console.log('unable to get books', err)
        }).then(() => {
          this.loading = false
        })
      }
    }, mounted () {
      this.getBooks()
    }
  }
</script>

<style>

</style>
