<template>
  <div class="drug-main">
    <div class="drug-search">
      <search/>
    </div>
    <div class="drug-content">
      <div class="drug-graph">
        <graph/>
      </div>
      <div class="drug-person">
        <person-info/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Search from "./Search.vue";
import Graph from "./Graph.vue";
import PersonInfo from "./PersonInfo.vue";
export default Vue.extend({
  components: { PersonInfo, Search, Graph }
});
</script>

<style scoped>
.drug-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drug-search {
  min-height: 100px;
  border-bottom: 1px solid rgb(238, 241, 246);
  padding: 5px 0 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.drug-content {
  flex-grow: 2;
  display: flex;
}

.drug-graph {
  flex-grow: 2;
  overflow-y: auto;
}

.drug-person {
  width: 510px;
  overflow-y: auto;
  border-left: 1px solid rgb(238, 241, 246);
}
</style>

