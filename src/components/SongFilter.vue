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
            <span v-if="!complexFilter">Simple mode</span>
            <span v-if="complexFilter">Complex mode</span>
          </b-button>
        </div>
      </div>
      <div class="container mt-3">
        <div v-if="!complexFilter" class="row">
          <div class="col-4">
            <b-card title="Artist">
              <b-card-text>
                <multi-input-lines
                  :items="filters.artist"
                  :valuePropertyName="'value'"
                  :placeholder="'Name'"
                  :addButtonText="'Add Artist'"
                  @add-item="addNewArtistFilter"
                  @remove-item="removeArtistFilter"
                ></multi-input-lines>
              </b-card-text>
            </b-card>
          </div>
          <div class="col-4">
            <b-card title="Genre">
              <b-card-text>
                <multi-input-lines
                  :items="filters.genre"
                  :valuePropertyName="'value'"
                  :placeholder="'Genre'"
                  :addButtonText="'Add Genre'"
                  @add-item="addNewGenreFilter"
                  @remove-item="removeGenreFilter"
                ></multi-input-lines>
              </b-card-text>
            </b-card>
          </div>
          <div class="col-4">
            <b-card title="Release date">
              <b-card-text>
                <multi-input-lines
                  :items="filters.release"
                  :valuePropertyName="'value'"
                  :placeholder="'Year'"
                  :addButtonText="'Add Year'"
                  @add-item="addNewReleaseDateFilter"
                  @remove-item="removeReleaseDateFilter"
                ></multi-input-lines>
              </b-card-text>
            </b-card>
          </div>
        </div>
        <div v-if="complexFilter" class="row">
          <div class="col">
            <b-form-textarea
              id="textarea-complex"
              v-model="filters.complex"
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

export default Vue.extend({
  name: "song-filter",
  components: { MultiInputLines },
  data() {
    return {
      complexFilter: false,
      filters: {
        artist: [{ value: "" }],
        genre: [{ value: "" }],
        release: [{ value: 2019 }],
        complex: ""
      }
    };
  },
  methods: {
    switchFilterMode() {
      this.complexFilter = !this.complexFilter;
    },
    addNewArtistFilter() {
      this.filters.artist.push({ value: "" });
    },
    removeArtistFilter(index: number) {
      this.filters.artist.splice(index, 1);
    },
    addNewGenreFilter() {
      this.filters.genre.push({ value: "" });
    },
    removeGenreFilter(index: number) {
      this.filters.genre.splice(index, 1);
    },
    addNewReleaseDateFilter() {
      this.filters.release.push({ value: 2019 });
    },
    removeReleaseDateFilter(index: number) {
      this.filters.release.splice(index, 1);
    }
  }
});
</script>

<style>
</style>
