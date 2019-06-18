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
  watch: {
    personData(data) {
      const elem = document.getElementsByClassName("drug-person")[0] as any;
      if (data) {
        elem.style.borderLeft = "1px solid rgb(238, 241, 246)";
      } else {
        elem.style.borderLeft = "";
      }
    }
  },
  methods: {
    showPersonData(phoneNumber) {
      this.personData = null;
      const loading = this.$loading({
        fullscreen: false,
        target: ".drug-person"
      });
      apiClient
        .getPersonData(phoneNumber)
        .then(data => {
          this.personData = data;
        })
        .catch(error => {
          console.error(error);
          this.$error("加载个人信息时系统出错！");
        })
        .finally(() => {
          loading.close();
        });
    },
    handleSearch(phoneNumbers) {
      this.graphData = null;
      const loading = this.$loading({
        fullscreen: false,
        target: ".drug-graph"
      });
      apiClient
        .getDrugRelatedPersGraph(phoneNumbers)
        .then(data => {
          this.graphData = data;
          if (data && data.graph && data.graph.nodes && data.graph.nodes[0]) {
            this.showPersonData(data.graph.nodes[0].id);
          }
          if (data && data["no-data"] && data["no-data"].length > 0) {
            this.$error("以下电话没有匹配数据: " + data["no-data"].join(","));
          }
        })
        .catch(error => {
          console.error(error);
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
  /* overflow-y: auto; */
  height: 90%;
}

.drug-person {
  width: 30%;
  overflow-y: auto;
}
</style>

