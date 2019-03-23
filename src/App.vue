<template>
  <div id="app">
    <Navigation/>
    <div class="container">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
  name: "landing",
  components: {
    Navigation,
    Footer,
  }
});
</script>

<style>
</style>
