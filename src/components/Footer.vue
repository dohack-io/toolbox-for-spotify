<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">Created at DO!HackJS 2019</span>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",
  props: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Sticky footer styles
-------------------------------------------------- */
.footer {
  position: relative;
  height: 80px;
  padding-top: 30px;
  width: 100%;
  background: #f5f5f5;
  z-index: 10;
  text-align: center;
}
</style>
