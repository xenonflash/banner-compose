<template >
  <div id="app">
    <banner-composer/>
  </div>
</template>

<script>
import BannerComposer from './components/banner-compose'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
export default {
  name: 'app',
  components: {
    BannerComposer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
