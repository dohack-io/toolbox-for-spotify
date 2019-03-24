<template>
  <div class="container p-0">
    <div v-for="(item, index) in items" :key="index" class="row mb-1">
      <div class="col-9 col-md-11 pr-0">
        <slot v-bind:item="item"></slot>
      </div>
      <div class="col-3 col-md-1 pl-0">
        <b-button
          class="float-right"
          variant="danger"
          @click="removeItem(index)"
        >
          <i class="fas fa-minus-circle"></i>
        </b-button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <b-button
          class="float-right error"
          variant="success"
          @click="addItem()"
        >
          <i class="fas fa-plus-circle"></i> {{ addButtonText }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "multiinputlines",
  components: {},
  props: {
    placeholder: String,
    items: Array,
    valuePropertyName: String,
    addButtonText: String
  },
  methods: {
    addItem() {
      this.$emit("add-item");
    },
    removeItem(index: number) {
      this.$emit("remove-item", index);
    }
  }
});
</script>

<style>
</style>
