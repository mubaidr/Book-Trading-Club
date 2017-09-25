<template>
  <div>
    <h1>Trade Requests</h1>
    <br/>
    <div class="progress progress-striped active" v-if="loading">
      <div class="progress-bar" style="width: 45%"></div>
    </div>
    <template v-else>
      <h2>Requests for you: </h2>
      <p>You can accept or decline requests. </p>
      <div class="row">{{incomingTrades}}</div>
      <hr/>
      <h2>Your requests: </h2>
      <p>You can view status for submitted requests. </p>
      <div class="progress progress-striped active" v-if="loading">
        <div class="progress-bar" style="width: 45%"></div>
      </div>
      <div class="row">{{outgoingTrades}}</div>
    </template>
  </div>
</template>

<script>
  import router from './../utilities/router'
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        trades: null,
        loading: true
      }
    },
    computed: {
      ...mapGetters(['getAPI']),
      incomingTrades () {
        return this.trades
      },
      outgoingTrades () {
        return this.trades
      }
    },
    created () { },
    methods: {
      getTrades () {
        axios.get(this.getAPI.url + '/api/trades/').then(res => {
          this.trades = res.data
        }).catch(err => {
          console.log(err)
        }).then(() => {
          this.loading = false
        })
      }
    },
    mounted () {
      this.getTrades()
    }
  }
</script>

<style>

</style>
