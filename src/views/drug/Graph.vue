<template>
  <div class="graph-container">
    <div id="drugRelatedPerGraph"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";

export default Vue.extend({
  props: {
    graphData: Object
  },
  data(): any {
    return {
      chart: null
    };
  },
  watch: {
    graphData(newData) {
      const graph = newData.graph;
      const categoryCount = graph["categoryCount"];
      const nodeData = graph.nodes.map(n => {
        const isTargetNode = n.type === "target";
        const item = {
          itemStyle: {
            opacity: isTargetNode ? 1 : +n.score * 0.01
          },
          symbolSize: isTargetNode ? 150 : 80,
          symbol: isTargetNode ? "circle" : "circle",
          draggable: true,
          value: n["score"]
        };
        return Object.assign(n, item);
      });

      const linkData = graph.links.map(x => {
        x.value = 200;
        return x;
      });

      const categories = [{}];
      for (let i = 0; i < categoryCount; i++) {
        categories[i] = {
          name: "类目" + i
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
              repulsion: 200,
              edgeLength: 300
            },
            label: {
              show: true,
              fontSize: 18,
              formatter: params => {
                const { type, score, name } = params.data;
                return type === "target" ? name : `${name}\n(${score}%)`;
              }
            }
          }
        ]
      };
      this.chart.clear();
      this.chart.setOption(optionData);
    }
  },
  mounted() {
    this.chart = echarts.init(
      document.getElementById("drugRelatedPerGraph"),
      null,
      { renderer: "svg" }
    );
    this.chart.on("click", function(params) {
      const phoneNumber = params.data.id;
      console.log("&&&&", phoneNumber);
    });
    window.onresize = this.chart.resize;
  }
}) as any;
</script>

<style scoped>
.graph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#drugRelatedPerGraph {
  width: 100%;
  height: 100%;
  /* height: 500px; */
}
</style>

