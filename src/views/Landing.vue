<template>
  <div class="landing">
    <b-jumbotron header="Toolbox for Spotify" lead="Easy Song & Playlist Management">
      <p>Created at DO!HackJS 2019</p>
      <b-button variant="primary" :href="this.spotifyAuthUrl">Source</b-button>
    </b-jumbotron>
    <Authorization/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Authorization from "@/components/Authorization.vue"; // @ is an alias to /src

import { stringify } from "query-string";

const authUrl = "https://accounts.spotify.com/authorize?";
const authQuery = stringify({
  response_type: "code",
  client_id: "58d754b89f7b4bd7bcb097ece2191923",
  scope: "user-read-private user-read-email",
  redirect_uri: "http://localhost:8080/auth/",
  state: "blablafoo"
});

export default Vue.extend({
  name: "landing",
  data: () => ({
    spotifyAuthUrl: authUrl + authQuery
  }),
  components: {
    Authorization
  }
});
</script>
