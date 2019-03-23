<template>
  <div class="landing">
    <b-jumbotron
      header="Toolbox for Spotify"
      lead="Easy Song & Playlist Management"
    >
      <Authorization />
    </b-jumbotron>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Authorization from "@/components/Authorization.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "landing",
  components: {
    Authorization
  }
});
</script>
