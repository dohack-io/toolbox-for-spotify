<template>
  <div id="app">
    <div id="content">
      <Navigation/>
      <div class="container">
        <router-view/>
      </div>
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
  },
});
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}

#content {
  position: relative;
  min-height: calc(100% - 80px);
  padding-bottom: 30px;
  z-index: 20;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25);
}
</style>
