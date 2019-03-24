<template>
  <div class="container">
    <template v-if="display == 'settings'">
      <query-settings/>
      <div class="row">
        <div class="col">
          <b-button
            class="float-right mt-3"
            variant="success"
            @click="executeQuery()"
          >
            Show Results
            <i class="fas fa-arrow-alt-circle-right ml-2"></i>
          </b-button>
        </div>
                  Exevuting: {{ executing }}
          Error: {{ error }}
      </div>
    </template>
    <template v-if="display == 'results'">
      <query-results/>
      <div class="row">
        <div class="col">
          <b-button class="mt-3" variant="info" @click="display = 'settings'">
            <i class="fas fa-arrow-alt-circle-left mr-2"></i> Edit
            Query
          </b-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import QuerySettings from "@/components/QuerySettings.vue";
import QueryResults from "@/components/QueryResults.vue";

import * as query from "../toolbox/query";

import { createHelpers } from "vuex-map-fields";
import { mapGetters, mapActions } from "vuex";

const { mapFields, mapMultiRowFields } = createHelpers({
  getterType: "query/getField",
  mutationType: "query/updateField"
});

export default Vue.extend({
  name: "query",
  components: { QuerySettings, QueryResults },
  data() {
    return {
      resultPage: false
    };
  },
  computed: {
    ...mapFields(["display", "executing", "error"]),
    ...mapGetters("query", ["canExecuteQuery"])
  },
  methods: {
    ...mapActions("query", ["executeQuery"])
  }
});
</script>

<style>
</style>
