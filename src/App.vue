<template>
  <div id="app">
    <Navigation/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Navigation from "@/components/Navigation.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "landing",
  components: {
    Navigation,
  },
});
</script>

<style>
</style>
