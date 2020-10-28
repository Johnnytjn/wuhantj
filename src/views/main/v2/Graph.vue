<template>
  <div class="graph-container">
    <div id="relatedPerGraph" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";

export default Vue.extend({
  props: {
    graphData: Object,
    onPersonSelected: Function,
    type: String,
  },
  data(): any {
    return {
      chart: null,
    };
  },
  watch: {
    graphData(newData) {
      if (!newData && this.chart) {
        this.chart.clear();
        return;
      }

      const graph = newData.graph;
      const categoryCount = graph["categoryCount"];
      const nodeData = graph.nodes.map((n) => {
        const isTargetNode = n.dataType === "target";
        const item = {
          itemStyle: {
            opacity: isTargetNode ? 1 : +n.score * 0.01,
          },
          symbolSize: isTargetNode ? 150 : 80,
          symbol: isTargetNode ? "circle" : "circle",
          draggable: true,
          value: n["score"],
        };
        return Object.assign(n, item);
      });

      const linkData = graph.links.map((x) => {
        x.value = 200;
        return x;
      });

      const categories = [{}];
      for (let i = 0; i < categoryCount; i++) {
        categories[i] = {
          name: "类目" + i,
        };
      }

      const optionData = {
        animation: false,
        // tooltip: {
        //   formatter: params => {
        //     const { type, score, name } = params.data;
        //     return type === "target" ? name : `${name}\n(${score}%)`;
        //   }
        // },
        series: [
          {
            name: "涉毒关系人",
            type: "graph",
            layout: "force",
            data: nodeData,
            links: linkData,
            categories: categories,
            roam: true,
            focusNodeAdjacency: true,
            force: {
              // repulsion: 200,
              // edgeLength: 300
              repulsion: 60,
              edgeLength: 500,
            },
            label: {
              show: true,
              fontSize: 18,
              formatter: (params) => {
                const { dataType, score, name, type, id } = params.data;
                return dataType === "target" || type === "cosmetic"
                  ? `${name}\n(${id})`
                  : `${name}\n(${score}%)`;
              },
            },
          },
        ],
      };
      this.chart.clear();
      this.chart.setOption(optionData);
    },
  },
  mounted() {
    const that = this;
    this.chart = echarts.init(
      document.getElementById("relatedPerGraph"),
      null,
      { renderer: "svg" }
    );
    this.chart.on("click", function (params) {
      const { id: phoneNumber, type } = params.data;
      if (type !== "cosmetic") {
        that.onPersonSelected(phoneNumber);
      }
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
  width: 100%;
}

#relatedPerGraph {
  width: 500px;
  height: 400px;
}
</style>

