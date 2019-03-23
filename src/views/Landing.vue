<template>
  <div class="landing">
    <b-jumbotron header="Toolbox for Spotify" lead="Easy Song & Playlist Management">
      <p>Created at DO!HackJS 2019</p>
      <b-button variant="primary" href="https://github.com/dohack-io/toolbox-for-spotify">Source</b-button>
    </b-jumbotron>
    <Authorization />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Authorization from "@/components/Authorization.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "landing",
  components: {
    Authorization,
  },
});
</script>
