<template>
  <div class="authorization">
    <p>
      Click the button below to log in to your Spotify account, so that we can
      manage your music for you.
    </p>
    <div class="float-left">
      <b-button
        :disabled="authDone"
        variant="primary"
        :href="this.spotifyAuthUrl"
      >
        <i class="fab fa-spotify"></i> Authenticate with Spotify
      </b-button>
      <template v-if="authDone">
        <i class="fas fa-thumbs-up ml-3 mr-1"></i>
        Successfully authenticated
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
  name: "Authorization",
  data: () => ({
    spotifyAuthUrl: authUrl + authQuery
  }),
  computed: {
    authDone(): boolean {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  props: {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
