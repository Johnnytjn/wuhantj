<template>
  <div class="main">
    <div class="graph">
      <graph
        :graphData="graphData"
        :onPersonSelected="showPersonData"
        :type="type"
        v-if="type !== 'fraud'"
      />
    </div>
    <div class="person">
      <person-info :personData="personData" :type="type" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Graph from "./Graph.vue";
import PersonInfo from "./PersonInfo.vue";

export default Vue.extend({
  components: { Graph, PersonInfo },
  props: {
    graphData: Object,
    type: String,
  },
});
</script>
<style lang="scss" scoped>
.main {
  height: 400px;
  width: 100%;
  .graph {
    width: 70%;
    height: 400px;
  }
}
</style>