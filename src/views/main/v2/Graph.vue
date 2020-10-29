<template>
  <div class="graph-container">
    <div id="relatedPerGraph" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";

const buildGraphNode = (n) => {
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
};

const buildGraphLink = (x) => {
  x.value = 200;
  return x;
};

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
    graphData(newData, oldData) {
      console.log(">>>>>>>>new graph data:", newData, oldData);
      // if (!newData && this.chart) {
      //   this.chart.clear();
      //   return;
      // }

      if (oldData === null && newData) {
        // init
        const graph = newData.graph;
        const categoryCount = graph["categoryCount"];
        const nodeData = graph.nodes.map(buildGraphNode);

        const linkData = graph.links.map(buildGraphLink);

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
              name: "关系图",
              type: "graph",
              // layout: "force",
              layout: "circular",
              data: nodeData,
              links: linkData,
              categories: categories,
              roam: true,
              focusNodeAdjacency: true,
              nodeScaleRatio: 0,
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
        // this.chart.clear();
        this.chart.setOption(optionData);
        setTimeout(() => {
          const { width, height } = document
            .querySelector(".groupanalysis-graph")
            .getBoundingClientRect();
          this.chart.resize({ width, height });
        });
      } else if (oldData && newData) {
        console.log(">>>>>>> going to update chart", newData);

        const updatedOptionData = Object.assign({}, this.chart.getOption());
        newData.nodes.forEach((node) => {
          const { id, name, dataType, score, category } = node;
          updatedOptionData.series[0].data.push(
            buildGraphNode({ id, name, dataType, score, category })
          );
        });
        newData.links.forEach(({ source, target }) => {
          updatedOptionData.series[0].links.push(
            buildGraphLink({ source, target })
          );
        });
        // update
        console.log(">>>>>>>new option:", updatedOptionData);
        this.chart.setOption(updatedOptionData, false);
      }
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
      console.log("############", params);
      const { id: phoneNumber, type } = params.data;
      that.onPersonSelected(params.data, true);
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
  /* height: 500px;
  width: 500px; */
  height: 100%;
  width: 100%;
}
</style>

