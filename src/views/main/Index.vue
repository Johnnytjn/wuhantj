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
      <div class="detail">
        <template v-if="type === 'fraud' && fraudGraphData && graphHumanData">
          <div class="fraud-info">
            <div class="fraud-info-graph">
              <fraud-graph :graphData="fraudGraphData" :type="type" />
            </div>
            <div class="fraud-info-person">
              <person-info :personData="graphHumanData" :type="type" />
            </div>
          </div>
        </template>
        <el-tabs
          tab-position="left"
          v-show="type !== 'fraud' && !!graphData && !!graphHumanData"
          @tab-click="onClickTab"
          value="group"
          :key="type"
        >
          <el-tab-pane label="群体发现" name="group">
            <div class="groupanalysis">
              <div class="groupanalysis-graph">
                <graph
                  :graphData="graphData"
                  :onPersonSelected="showPersonData"
                  :type="type"
                  v-show="type !== 'fraud'"
                />
              </div>
              <div class="groupanalysis-person">
                <person-info :personData="graphHumanData" :type="type" />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="轨迹分析" name="track"
            ><track-map :trackData="trackData"
          /></el-tab-pane>
          <el-tab-pane label="标签展示" name="tag"
            ><tag-view :tagData="tagData" v-if="type !== 'fraud' && !!tagData"
          /></el-tab-pane>
        </el-tabs>
      </div>
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
// import FeatureGraph from "./graph/fraud/FeatureGraph.vue";
import apiClient from "../../utils/api-client";

import Detail from "./v2/Detail.vue";
import Person from "./v2/Person.vue";
import FeatureGraph from "./v2/FeatureGraph.vue";

import TrackMap from "./v2/TrackMap.vue";
import FraudGraph from "./v2/FraudGraph.vue";
import Graph from "./v2/Graph.vue";
import PersonInfo from "./v2/PersonInfo.vue";
import TagView from "./v2/TagView.vue";

export default Vue.extend({
  components: {
    Search,
    FeatureGraph,
    Person,
    TrackMap,
    FraudGraph,
    Graph,
    PersonInfo,
    TagView,
  },
  data() {
    return {
      trackData: null,
      featureInfo: null,
      graphHumanData: null,
      personData: null,
      graphData: null,
      type: this.$route.params.type || "drug",
      resetTrackDataEver: false,
      resetTagDataEver: false,
      numberInSearch: null,
      fraudGraphData: null,
      tagData: null,
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
        this.graphHumanData = null;
        this.featureInfo = null;
        this.graphData = null;
        this.trackData = null;
        this.resetTrackDataEver = false;
        this.resetTagDataEver = false;
        this.numberInSearch = null;
        this.fraudGraphData = null;
        this.tagData = null;

        this.$clearMessage();
        // console.log(">>>>> force");
        // this.$forceUpdate();
      }
    },
    personData(data) {
      const elem = document.getElementsByClassName("general")[0] as any;
      if (data) {
        elem.style.borderBottom = "1px solid rgb(238, 241, 246)";
      } else {
        elem.style.borderBottom = "";
      }
    },
  },
  methods: {
    onClickTab(tab) {
      if (tab.name === "track") {
        if (this.resetTrackDataEver === false) {
          this.trackData = Object.assign({}, this.trackData);
          this.resetTrackDataEver = true;
        }
      } else if (tab.name === "group") {
        this.graphData = Object.assign({}, this.graphData);
      } else if (tab.name === "tag") {
        if (this.resetTagDataEver === false) {
          this.tagData = Object.assign({}, this.tagData);
          this.resetTagDataEver = true;
        }
      }
    },
    showPersonData(selectedPerson, needUpdateGraph) {
      const { id: phoneNumber, category, scrollTop } = selectedPerson;
      this.graphHumanData = null;
      const loading = this.$loading({
        fullscreen: false,
        target: ".drug-person",
      });
      const that = this;
      apiClient
        .getPersonData(this.type, phoneNumber)
        .then((data) => {
          this.graphHumanData = data;
          if (needUpdateGraph) {
            const personData = data["person_data"];
            const updatedGraphData = { nodes: [], links: [], scrollTop };
            Object.entries(personData).forEach(([phoneNum, person]) => {
              const { name, score } = person;
              updatedGraphData.nodes.push({
                id: phoneNum,
                dataType: "contact",
                name,
                score,
                category,
              });
              updatedGraphData.links.push({
                source: phoneNumber,
                target: phoneNum,
              });
            });
            that.graphData = updatedGraphData;
          }
        })
        .catch((err) => {
          console.error(err);
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

      apiClient
        .search(this.type, phoneNumbers)
        .then((data) => {
          if (data["exist"] === 1) {
            this.numberInSearch = phoneNumbers[0];
            if (this.type !== "fraud") {
              const { personInfo, featureInfo } = data;

              if (personInfo) {
                this.personData = personInfo;
              }
              if (featureInfo) {
                this.featureInfo = featureInfo;
              }
              apiClient.getGraph(this.type, phoneNumbers).then((data) => {
                this.graphData = data;
                this.graphHumanData = data["personData"];
              });

              apiClient.getTrackData(this.type, phoneNumbers).then((data) => {
                this.trackData = data;
              });

              apiClient.getTagData(this.type, phoneNumbers).then((data) => {
                this.tagData = data;
              });
            } else {
              this.fraudGraphData = data["show_feature"];
              this.personData = data["basic-info"];
              this.featureInfo = data["featureInfo"];
              this.graphHumanData = data;
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

  .general {
    display: flex;
    height: 250px;
    /* border-bottom: 1px solid rgb(238, 241, 246); */

    .person-info {
      display: flex;
      align-items: center;
      text-align: left;
      padding: 20px;
      width: 60%;
      overflow: auto;
    }

    .person-graph {
      flex-grow: 2;
    }
  }

  .detail {
    flex-grow: 2;
    padding-left: 24px;
    padding-right: 24px;

    .fraud-info {
      display: flex;

      .fraud-info-graph {
        width: 70%;
      }

      .fraud-info-person {
        border-left: 1px solid rgb(238, 241, 246);
        width: 30%;
        overflow-y: auto;
      }
    }

    .groupanalysis {
      height: 600px;
      width: 100%;
      display: flex;

      .groupanalysis-graph {
        height: 100%;
        width: 70%;
      }
      .groupanalysis-person {
        width: 30%;
        overflow-y: auto;
        border-left: 1px solid rgb(238, 241, 246);
      }
    }
  }
}
</style>

