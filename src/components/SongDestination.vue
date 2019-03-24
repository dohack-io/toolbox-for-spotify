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
          <b-button variant="success" class="float-right"
            >Save <i class="fas fa-save ml-1"></i
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
          <b-button variant="success" class="float-right mt-2"
            >Save <i class="fas fa-save ml-1"></i
          ></b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-card
          title="Existing Playlist"
          sub-title="Save the selected songs to a existing playlist."
        >
          <b-form-select
            v-model="existing.selectedId"
            :options="existing.availablePlaylist"
          />
          <div class="row align-items-center no-gutters">
            <div class="col-4">
              <b-button variant="info" class="mt-2"
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
              <b-button variant="success" class="float-right mt-2"
                >Save <i class="fas fa-save ml-1"></i
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
import { mapActions } from "vuex";

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
      "sink.existing.mode",
      "sink.existing.availablePlaylist",
      "sink.existing.selectedId"
    ])
  }
});
</script>

<style>
</style>
