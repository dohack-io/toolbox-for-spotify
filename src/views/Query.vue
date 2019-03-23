<template>
  <div>
    <h1>Enter your query m8</h1>

    <b-button @click="test()" variant="success">Always Pressed</b-button>
  </div>
</template>

<script lnag="ts">
import Vue from "vue";
import Authorization from "@/components/Authorization.vue"; // @ is an alias to /src

import * as query from "../toolbox/query";

export default Vue.extend({
  name: "landing",
  components: {
    Authorization
  },
  methods: {
    test()  {
      query.loadTracksFromSource(this.$store.state.auth.code, {
        type:"playlists",
        playlistIds: ["608oAZh9je5zA95dZAkpuO","37i9dQZF1DX4jP4eebSWR9"]
      }, {})
      .then(items => {
        console.log(items);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
});
</script>

<style>
</style>
