<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Protected page</router-link> |
      <span v-if="isLoggedIn"> <a @click="logout">Logout</a></span>
      <span v-else> <router-link to="/login">Login</router-link></span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    computed: {
      isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
      }
    },
    mounted() {

    },
    methods: {
      logout: function() {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/login");
        });
      }
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
