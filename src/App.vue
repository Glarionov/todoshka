<template>
  <div id="app">
    <div class="whole-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*background: rgb(31, 1, 53);*/
  /*background: rgb(160,160,100);*/
  background: rgb(17, 49, 107);
  width: 100%;
  height: 100%;
  font-family: Verdana, Geneva, sans-serif, Avenir, Helvetica, Arial;
}
</style>
