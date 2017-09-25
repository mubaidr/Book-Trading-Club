<template>
  <div>
    <h1>Books</h1>
    <p></p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        books: null
      }
    },
    computed: {
      isUserCollection () {
        return this.$route.params.user
      }
    },
    created () {

    }
  }
</script>

<style>

</style>
