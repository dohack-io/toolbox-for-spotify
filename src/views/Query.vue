<template>
  <div>
    <template v-if="!resultPage">
      <query-settings />
      <div class="row">
        <div class="col">
          <b-button
            class="float-right mt-3"
            variant="info"
            @click="switchResultPage()"
            >Show Results <i class="fas fa-arrow-alt-circle-right ml-2"></i
          ></b-button>
        </div>
      </div>
    </template>
    <template v-if="resultPage">
      <query-results />
      <div class="row">
        <div class="col">
          <b-button class="mt-3" variant="info" @click="switchResultPage()"
            ><i class="fas fa-arrow-alt-circle-left mr-2"></i> Edit
            Query</b-button
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import QuerySettings from "@/components/QuerySettings.vue";
import QueryResults from "@/components/QueryResults.vue";

export default Vue.extend({
  name: "query",
  components: { QuerySettings, QueryResults },
  data() {
    return {
      resultPage: false
    };
  },
  methods: {
    switchResultPage() {
      this.resultPage = !this.resultPage;
    }
  }
});
</script>

<style>
</style>
