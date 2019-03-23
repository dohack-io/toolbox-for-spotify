<template>
  <b-card title="Source" sub-title="Where do your songs come from?">
    <div class="container mt-3">
      <b-form-select v-model="selected" :options="options" />
    </div>
    <div class="container mt-3" v-if="selected == 'playlists'">
      <multi-input-lines
        :items="playlists"
        :valuePropertyName="'value'"
        :placeholder="'Playlist URL'"
        :addButtonText="'Add Playlist'"
        @add-item="addNewPlaylist"
        @remove-item="removePlaylist"
      ></multi-input-lines>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import MultiInputLines from "@/components/MultiInputLines.vue";

export default Vue.extend({
  name: "song-source",
  components: { MultiInputLines },
  data() {
    return {
      selected: "all",
      options: [
        { value: "all", text: "All Songs" },
        { value: "playlists", text: "Songs in Playlists" },
        { value: "user", text: "Your Library" }
      ],
      playlists: [{ value: "" }]
    };
  },
  methods: {
    addNewPlaylist() {
      this.playlists.push({ value: "" });
    },
    removePlaylist(index: number) {
      this.playlists.splice(index, 1);
    }
  }
});
</script>

<style>
</style>
