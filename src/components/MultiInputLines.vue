<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="row mb-1">
      <div class="col-11 pr-0">
        <b-form-input
          type="text"
          v-model="item.value"
          :placeholder="placeholder"
        />
      </div>
      <div class="col-1 pl-0">
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
      <div class="col-9 pr-0"></div>
      <div class="col-3 pl-0">
        <b-button
          class="float-right error"
          variant="success"
          @click="addItem()"
        >
          <i class="fas fa-plus-circle"></i> Add Playlist
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
    items: Array
  },
  methods: {
    addItem() {
      this.$props.items.push({ value: "" });
    },
    removeItem(index: number) {
      this.$props.items.splice(index, 1);
    }
  }
});
</script>

<style>
</style>
