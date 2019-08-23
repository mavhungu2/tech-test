<template>
  <div id="app">
    <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/">Home</b-nav-item>
          <b-nav-item href="/#/about">About</b-nav-item>
          <b-nav-item href="/#/task">Task</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import Navigation from './components/NavBar.vue'

export default {
  name: 'app',
  // components: {
  //   HelloWorld,
  //   Navigation
  // },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
