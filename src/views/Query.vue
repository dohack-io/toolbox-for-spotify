<template>
  <div>
    <div class="page-header mt-3 ml-1">
      <h1>Query</h1>
    </div>
    <b-row class="mt-3">
      <b-col>
        <song-source />
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <song-filter />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SongSource from "@/components/SongSource.vue";
import SongFilter from "@/components/SongFilter.vue";
import MultiInputLines from "@/components/MultiInputLines.vue";

export default Vue.extend({
  name: "query",
  components: { MultiInputLines, SongFilter, SongSource },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style>
</style>
