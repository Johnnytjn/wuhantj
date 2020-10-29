<template>
  <div class="graph-container">
    <div id="featureGraph" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";

export default Vue.extend({
  props: {
    featureInfo: Object,
  },
  data(): any {
    return {
      chart: null,
    };
  },
  watch: {
    featureInfo(newData) {
      if (!newData && this.chart) {
        this.chart.clear();
        return;
      }

      const { featureName, featureScore, predict } = newData;

      const categories = [{ name: "predict" }, { name: "feature" }];

      const nodeData = [{ name: `${predict}%`, category: 0 }];
      featureName.forEach((name) => {
        const formattedName = name.substring(0, 5) + "\n" + name.substring(5);
        nodeData.push({
          name: formattedName,
          category: 1,
        });
      });

      const linkData = featureName.map((name, idx) => {
        return {
          source: 0,
          target: idx + 1,
          symbolSize: [5, 20],
          label: {
            show: true,
            formatter: () => featureScore[idx],
          },
        };
      });

      const optionData = {
        animation: false,
        series: [
          {
            name: "feature graph",
            type: "graph",
            layout: "circular",
            // layout: "force",
            categories,
            data: nodeData,
            links: linkData,
            roam: true,
            nodeScaleRatio: 0,
            // focusNodeAdjacency: true,
            force: {
              // repulsion: 200,
              // edgeLength: 300
              repulsion: 60,
              edgeLength: 500,
            },
            label: {
              show: true,
            },
            symbolSize: [80, 50],
            symbol: "rect",
          },
        ],
      };
      this.chart.clear();
      this.chart.setOption(optionData);
    },
  },
  mounted() {
    const that = this;
    this.chart = echarts.init(document.getElementById("featureGraph"), null, {
      renderer: "svg",
    });
    window.onresize = this.chart.resize;
  },
}) as any;
</script>

<style scoped>
.graph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#featureGraph {
  width: 100%;
  height: 100%;
  /* height: 500px; */
}
</style>

