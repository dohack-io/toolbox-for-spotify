<template>
  <div>
    <div class="page-header mt-3">
      <h1>Results</h1>

      <b-list-group>
        <b-list-group-item>
          <div class="row">
            <div class="col-1 text-center p-0">
              <b-form-checkbox
                :checked="selectedSongs === items.length"
                @change="markAllResultItems"
              ></b-form-checkbox>
            </div>
            <div class="col-11 p-0">{{ selectedSongs }} Songs selected</div>
          </div>
        </b-list-group-item>

        <b-list-group-item v-for="item in items" v-bind:key="item.track.id">
          <div class="row align-items-center">
            <div class="col-1 text-center p-0">
              <b-form-checkbox v-model="item.selected"></b-form-checkbox>
            </div>
            <div class="col-1 p-0">
              <img :src="item.track | getCoverUrl" alt="" class="src" />
            </div>
            <div class="col-10 p-0">
              <h4>
                {{ item.track.artists | concatFields("name") }} -
                {{ item.track.name }}
              </h4>
              <h6>
                {{ item.track.album.name }} -
                {{ item.track.duration_ms | msToMinutesAndSeconds }}
              </h6>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { createHelpers } from "vuex-map-fields";
import { mapActions, mapGetters } from "vuex";

const { mapFields, mapMultiRowFields } = createHelpers({
  getterType: "query/getField",
  mutationType: "query/updateField"
});

export default Vue.extend({
  name: "query-results",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions("query", ["markAllResultItems"])
  },
  computed: {
    ...mapGetters("query", ["selectedSongs"]),
    ...mapMultiRowFields(["results.items"])
  },
  filters: {
    concatFields(artists: any[], fieldName: string) {
      return artists.map(a => a[fieldName] as string).join(", ");
    },
    msToMinutesAndSeconds(ms: number) {
      const seconds = ms / 1000;
      return Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60);
    },
    getCoverUrl(song: any) {
      if ("images" in song) {
        return song.images[2].url;
      } else if ("images" in song.album) {
        return song.album.images[2].url;
      }
    }
  }
});
</script>

<style>
</style>
 