<template>
  <b-card title="Source" sub-title="Where do your songs come from?">
    <div class="container mt-3">
      <b-form-select v-model="selected" :options="options" />
    </div>
    <div class="container mt-3" v-if="selected == 'playlists'">
      <multi-input-lines
        :items="playlists"
        :placeholder="'Playlist URL'"
      ></multi-input-lines>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import MultiInputLines from "@/components/MultiInputLines.vue";

import { createHelpers } from 'vuex-map-fields';

// `fooModule` is the name of the Vuex module.
const { mapFields, mapMultiRowFields } = createHelpers({
  getterType: 'query/getField',
  mutationType: 'query/updateField',
});

export default Vue.extend({
  name: "song-source",
  components: { MultiInputLines },
  data() {
    return {
      // selected: "all",
      options: [
        { value: "all", text: "All Songs" },
        { value: "playlists", text: "Songs in Playlists" },
        { value: "user", text: "Your Library" }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapFields(["settings.source.selected"]),
    ...mapMultiRowFields(["settings.source.playlists"]),
  }
});
</script>

<style>
</style>
