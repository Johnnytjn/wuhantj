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
import apiClient from "../../../utils/api-client";

export default Vue.extend({
  components: { Graph, PersonInfo },
  props: {
    graphData: Object,
    type: String,
  },
  data() {
    return {
      personData: null,
    };
  },
  methods: {
    showPersonData(phoneNumber) {
      this.personData = null;
      const loading = this.$loading({
        fullscreen: false,
        target: ".drug-person",
      });
      apiClient
        .getPersonData(this.type, phoneNumber)
        .then((data) => {
          this.personData = data;
        })
        .catch(() => {
          // console.error(error);
          this.$error("加载个人信息时系统出错！");
        })
        .finally(() => {
          loading.close();
        });
    },
  },
});
</script>
<style lang="scss" scoped>
.main {
  height: 600px;
  width: 100%;
  display: flex;

  .graph {
    height: 100%;
    width: 70%;
  }
  .person {
    width: 30%;
    overflow-y: auto;
  }
}
</style>