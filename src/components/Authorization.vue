<template>
  <div class="authorization">
    <p>Click the button below to log in to your Spotify account, so that we can manage your music for you.</p>
    <b-button variant="primary" href="#"><i class="fab fa-spotify"></i> Authenticate with Spotify</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Authorization",
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
