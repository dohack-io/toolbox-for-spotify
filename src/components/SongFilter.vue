<template>
  <div class="card">
    <div class="card-body">
      <div class="row mr-0">
        <div class="col-10 pr-0">
          <h4 class="card-title">Filter</h4>
          <h6 class="card-subtitle text-muted mb-2">
            Which songs do you want?
          </h6>
        </div>
        <div class="col-2 pl-0">
          <b-button
            variant="info"
            @click="switchFilterMode()"
            class="float-right"
          >
            <i class="fas fa-random mr-2"></i>
            <span v-if="selected === 'simple'">Simple mode</span>
            <span v-if="selected === 'complex'">Complex mode</span>
          </b-button>
        </div>
      </div>

      <div class="container mt-3">
        <!-- simple query -->
        <div v-if="selected === 'simple'" class="row">
          <div class="col-12 col-lg-4 mb-3 mb-lg-0">
            <b-card title="Artist">
              <b-card-text>
                <multi-input-lines
                  :items="artists"
                  addButtonText="Add Artist"
                  @add-item="addNewArtist"
                  @remove-item="removeArtist"
                >
                  <template v-slot:default="slotProps">
                    <b-form-input
                      type="text"
                      v-model="slotProps.item.name"
                      placeholder="Name"
                    />
                  </template>
                </multi-input-lines>
              </b-card-text>
            </b-card>
          </div>
          <div class="col-12 col-lg-4 mb-3 mb-lg-0">
            <b-card title="Genre">
              <b-card-text>
                <multi-input-lines
                  :items="genres"
                  addButtonText="Add Genre"
                  @add-item="addNewGenre"
                  @remove-item="removeGenre"
                >
                  <template v-slot:default="slotProps">
                    <b-form-input
                      type="text"
                      v-model="slotProps.item.name"
                      placeholder="Genre"
                    />
                  </template>
                </multi-input-lines>
              </b-card-text>
            </b-card>
          </div>
          <div class="col-12 col-lg-4 mb-3 mb-lg-0">
            <b-card title="Release date">
              <b-card-text>
                <multi-input-lines
                  :items="releaseDates"
                  addButtonText="Add Year"
                  @add-item="addNewReleaseDate"
                  @remove-item="removeReleaseDate"
                >
                  <template v-slot:default="slotProps">
                    <b-form-input
                      type="number"
                      v-model="slotProps.item.year"
                      placeholder="Year"
                    />
                  </template>
                </multi-input-lines>
              </b-card-text>
            </b-card>
          </div>
        </div>

        <!-- complex query -->
        <div v-if="selected === 'complex'" class="row">
          <div class="col">
            <b-form-textarea
              id="textarea-complex"
              v-model="expression"
              placeholder="Enter query..."
              rows="5"
              style="font-family:monospace;"
            />
          </div>
        </div>
      </div>
    </div>
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
  name: "song-filter",
  components: { MultiInputLines },
  data() {
    return {};
  },
  computed: {
    ...mapFields([
      "settings.filter.selected",
      "settings.filter.complex.expression"
    ]),
    ...mapMultiRowFields([
      "settings.filter.simple.artists",
      "settings.filter.simple.genres",
      "settings.filter.simple.releaseDates"
    ])
  },
  methods: {
    switchFilterMode() {
      if ((this as any).selected === "simple") {
        (this as any).selected = "complex";
      } else {
        (this as any).selected = "simple";
      }
    },
    ...mapActions("query", [
      "addNewArtist",
      "removeArtist",
      "addNewGenre",
      "removeGenre",
      "addNewReleaseDate",
      "removeReleaseDate"
    ])
  }
});
</script>

<style>
</style>
