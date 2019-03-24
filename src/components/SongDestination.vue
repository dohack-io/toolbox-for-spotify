<template>
  <div>
    <div class="page-header mt-3 ml-1">
      <h1>Save</h1>
    </div>
    <b-row class="mt-3">
      <b-col>
        <b-card
          title="Library"
          sub-title="Save the selected songs to your library."
        >
          <b-button
            variant="success"
            class="float-right"
            :disabled="!canSaveToLibrary"
            @click="executeSaveToLibrary()"
            >Save <i class="fas ml-1" :class="executeSaveLibraryButtonClass"></i
          ></b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-card
          title="New Playlist"
          sub-title="Save the selected songs to a new playlist."
        >
          <b-form-input
            type="text"
            v-model="name"
            placeholder="Playlist Name"
          />
          <div class="row">
            <div class="col-6">
              <b-form-checkbox v-model="publicPlaylist" class="mt-2 ml-2"
                >Public</b-form-checkbox
              >
            </div>
            <div class="col-6">
              <b-button
                variant="success"
                class="float-right mt-2"
                :disabled="!canSaveToNewPlaylist"
                @click="executeSaveToNewPlaylist()"
                >Save
                <i
                  class="fas ml-1"
                  :class="executeSaveNewPlaylistButtonClass"
                ></i
              ></b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-card
          title="Existing Playlist"
          sub-title="Save the selected songs to a existing playlist."
        >
          <b-form-select v-model="selectedId" :options="playlistOptions" />
          <div class="row align-items-center no-gutters">
            <div class="col-4">
              <b-button
                variant="info"
                class="mt-2"
                @click="executeSelectResults()"
                ><i class="fas fa-sync mr-1"></i> Refresh Playlists</b-button
              >
            </div>
            <div class="col-4 text-center">
              <b-form-group class="mt-2">
                <b-form-radio-group v-model="mode">
                  <b-form-radio value="append">Append</b-form-radio>
                  <b-form-radio value="replace">Replace</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
            <div class="col-4">
              <b-button
                variant="success"
                class="float-right mt-2"
                :disabled="!canSaveToExistingPlaylist"
                @click="executeSaveToExistingPlaylist()"
                >Save
                <i
                  class="fas ml-1"
                  :class="executeSaveExistingPlaylistButtonClass"
                ></i
              ></b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MultiInputLines from "@/components/MultiInputLines.vue";

import { createHelpers } from "vuex-map-fields";
import { mapActions, mapGetters } from "vuex";

const { mapFields, mapMultiRowFields } = createHelpers({
  getterType: "query/getField",
  mutationType: "query/updateField"
});

export default Vue.extend({
  name: "song-destination",
  components: { MultiInputLines },
  data() {
    return {};
  },
  computed: {
    ...mapFields([
      "sink.new.name",
      "sink.new.publicPlaylist",
      "sink.existing.mode",
      "sink.existing.availablePlaylist",
      "sink.existing.selectedId"
    ]),
    ...mapGetters("query", [
      "canSaveToLibrary",
      "canSaveToNewPlaylist",
      "canSaveToExistingPlaylist"
    ]),
    playlistOptions() {
      return (this as any).availablePlaylist.map((p: any) => ({
        value: p.id,
        text: p.name
      }));
    },
    executeSaveLibraryButtonClass(): any {
      const executing = (this as any).executing === "library";
      return {
        "fa-arrow-alt-circle-right": !executing,
        "fa-spin": executing,
        "fa-spinner": executing
      };
    },
    executeSaveNewPlaylistButtonClass(): any {
      const executing = (this as any).executing === "newPlaylist";
      return {
        "fa-arrow-alt-circle-right": !executing,
        "fa-spin": executing,
        "fa-spinner": executing
      };
    },
    executeSaveExistingPlaylistButtonClass(): any {
      const executing = (this as any).executing === "existingPlaylist";
      return {
        "fa-arrow-alt-circle-right": !executing,
        "fa-spin": executing,
        "fa-spinner": executing
      };
    }
  },
  methods: {
    ...mapActions("query", [
      "executeSelectResults",
      "executeSaveToLibrary",
      "executeSaveToNewPlaylist",
      "executeSaveToExistingPlaylist"
    ])
  }
});
</script>

<style>
</style>
