<template>
  <div class="main">
    <fraud-graph :graphData="graphData" :type="type" v-if="type === 'fraud'" />
    <el-tabs tab-position="left" v-if="type !== 'fraud'">
      <el-tab-pane label="群体发现"
        ><group-discovery :graphData="graphData" :type="type"
      /></el-tab-pane>
      <el-tab-pane label="轨迹分析"><track-map /></el-tab-pane>
      <el-tab-pane label="视频展示">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrackMap from "./TrackMap.vue";
import GroupDiscovery from "./GroupDiscovery.vue";
import FraudGraph from "./FraudGraph.vue";

export default Vue.extend({
  components: { TrackMap, GroupDiscovery, FraudGraph },
  props: {
    graphData: Object,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
}
</style>