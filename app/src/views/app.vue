<template>
  <div id="app">
    <header-comp></header-comp>
    <div class="container body">
      <transition appear :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
  import headerComp from './layout/header.vue'
  import footerComp from './layout/footer.vue'

  export default {
    data () {
      return {
        transitionName: 'slide-up'
      }
    },
    components: {
      headerComp,
      footerComp
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth === fromDepth) {
          this.transitionName = 'slide-up'
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    }
  }
</script>

<style>
  .container.body {
    padding: 50px 0;
  }
</style>
