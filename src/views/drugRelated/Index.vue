<template>
  <div class="drug-main">
    <div class="drug-search">
      <search :onSearch="handleSearch"/>
    </div>
    <div class="drug-content">
      <div class="drug-graph">
        <graph :graphData="graphData" :onPersonSelected="showPersonData"/>
      </div>
      <div class="drug-person">
        <person-info :personData="personData"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Search from "./Search.vue";
import Graph from "./Graph.vue";
import PersonInfo from "./PersonInfo.vue";
import apiClient from "../../utils/api-client";
export default Vue.extend({
  components: { PersonInfo, Search, Graph },
  data() {
    return {
      graphData: null,
      personData: null
    };
  },
  methods: {
    showPersonData(phoneNumber) {
      const loading = this.$loading({ fullscreen: true });
      apiClient
        .getPersonData(phoneNumber)
        .then(data => {
          this.personData = data;
        })
        .catch(error => {
          this.$error("加载个人信息时系统出错！");
        })
        .finally(() => {
          loading.close();
        });
    },
    handleSearch(phoneNumbers) {
      const loading = this.$loading({ fullscreen: true });
      apiClient
        .getDrugRelatedPersGraph(phoneNumbers)
        .then(data => {
          this.graphData = data;
          if (data && data.graph && data.graph.nodes && data.graph.nodes[0]) {
            this.showPersonData(data.graph.nodes[0].id);
          }
        })
        .catch(error => {
          this.$error("搜索时系统出错！");
        })
        .finally(() => {
          loading.close();
        });
    }
  } as any
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
  height: 90%;
}

.drug-graph {
  flex-grow: 2;
  overflow-y: auto;
  height: 90%;
}

.drug-person {
  width: 510px;
  overflow-y: auto;
  border-left: 1px solid rgb(238, 241, 246);
}
</style>

