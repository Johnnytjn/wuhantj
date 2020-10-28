<template>
  <div class="drug-main">
    <div class="drug-search">
      <search :onSearch="handleSearch" :type="type" />
    </div>
    <div class="result">
      <div class="general">
        <div class="person-info">
          <person :personData="personData" :type="type" />
        </div>
        <div class="person-graph">
          <feature-graph :featureInfo="featureInfo" />
        </div>
      </div>
      <div class="detail"><detail /></div>
    </div>
    <!-- <div class="drug-content">
      <div class="drug-graph">
        <graph
          :featureInfo="featureInfo"
          :onPersonSelected="showPersonData"
          :type="type"
          v-if="type!=='fraud'"
        />
        <feature-graph :featureInfo="featureInfo" v-if="type==='fraud'" />
      </div>
      <div class="drug-person">
        <person-info :personData="personData" :type="type" />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Search from "./Search.vue";
import Graph from "./Graph.vue";
// import FeatureGraph from "./graph/fraud/FeatureGraph.vue";
import PersonInfo from "./PersonInfo.vue";
import apiClient from "../../utils/api-client";

import Detail from "./v2/Detail.vue";
import Person from "./v2/Person.vue";
import FeatureGraph from "./v2/FeatureGraph.vue";

export default Vue.extend({
  components: { PersonInfo, Search, Graph, FeatureGraph, Detail, Person },
  data() {
    return {
      featureInfo: null,
      personData: null,
      type: this.$route.params.type || "drug",
    };
  },
  watch: {
    $route(newData, oldData) {
      const newType = newData.params.type;
      const oldType = oldData.params.type;
      console.log(newType, oldType);
      if (oldType !== newType) {
        this.type = newType;
        this.personData = null;
        this.featureInfo = null;
        this.$clearMessage();
        // console.log(">>>>> force");
        // this.$forceUpdate();
      }
    },
    // personData(data) {
    //   const elem = document.getElementsByClassName("drug-person")[0] as any;
    //   if (data) {
    //     elem.style.borderLeft = "1px solid rgb(238, 241, 246)";
    //   } else {
    //     elem.style.borderLeft = "";
    //   }
    // },
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
    handleSearch(phoneNumbers) {
      this.featureInfo = null;
      const loading = this.$loading({
        fullscreen: false,
        target: ".drug-graph",
      });

      // if (this.type === "fraud") {
      apiClient
        .search(this.type, phoneNumbers)
        .then((data) => {
          if (data["exist"] === 1) {
            const { personInfo, featureInfo } = data;
            if (personInfo) {
              this.personData = personInfo;
            }
            if (featureInfo) {
              this.featureInfo = featureInfo;
            }
          } else {
            this.$error("该电话没有匹配数据");
          }
        })
        .catch(() => {
          // console.error(error);
          this.$error("搜索时系统出错！");
        })
        .finally(() => {
          loading.close();
        });
      // } else {
      //   // apiClient
      //   //   .search(this.type, phoneNumbers)
      //   //   .then((data) => {
      //   //     const { personInfo, featureInfo } = data;
      //   //     if (personInfo) {
      //   //       this.personData = personInfo;
      //   //     }
      //   //     if (featureInfo) {
      //   //       this.featureInfo = featureInfo;
      //   //     }
      //   //     if (data && data["no-data"] && data["no-data"].length > 0) {
      //   //       this.$error("以下电话没有匹配数据: " + data["no-data"].join(","));
      //   //     }
      //   //   })
      //   //   .catch(() => {
      //   //     // console.error(error);
      //   //     this.$error("搜索时系统出错！");
      //   //   })
      //   //   .finally(() => {
      //   //     loading.close();
      //   //   });
      //   // apiClient
      //   //   .getGraph(this.type, phoneNumbers)
      //   //   .then((data) => {
      //   //     this.featureInfo = data;
      //   //     if (data && data.graph && data.graph.nodes && data.graph.nodes[0]) {
      //   //       this.showPersonData(data.graph.nodes[0].id);
      //   //     }
      //   //     if (data && data["no-data"] && data["no-data"].length > 0) {
      //   //       this.$error("以下电话没有匹配数据: " + data["no-data"].join(","));
      //   //     }
      //   //   })
      //   //   .catch(() => {
      //   //     // console.error(error);
      //   //     this.$error("搜索时系统出错！");
      //   //   })
      //   //   .finally(() => {
      //   //     loading.close();
      //   //   });
      // }
    },
  } as any,
});
</script>

<style scoped lang="scss">
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

.result {
  display: flex;
  flex-direction: column;
}

.general {
  display: flex;
  height: 250px;

  .person-info {
    display: flex;
    align-items: center;
    text-align: left;
    padding: 20px;
    width: 30%;
  }

  .person-graph {
    flex-grow: 2;
  }
}

.detail {
}
</style>

