<template>
  <div id="app">
    <Navbar></Navbar>
    <vue-page-transition  name="fade-in-right">>
      <router-view/>
    </vue-page-transition>
  </div>
</template>
<script>
  import Navbar from "./components/Navbar";
  export default {
    components: {Navbar},
  };
</script>

<style>

</style>
