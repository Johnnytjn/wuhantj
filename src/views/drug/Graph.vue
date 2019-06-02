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
        const item = {
          itemStyle: {
            opacity: n.type === "target" ? 1 : +n.score * 0.01
          },
          symbolSize: n.type === "target" ? 30 : 15,
          draggable: true
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
        series: [
          {
            type: "graph",
            layout: "force",
            data: nodeData,
            links: linkData,
            categories: categories,
            roam: true,
            animation: true,
            label: {
              show: true,
              normal: {
                position: "right"
              }
            },
            force: {
              repulsion: 200
            }
            // legend: [
            //   {
            //     // selectedMode: 'single',
            //     data: categories.map(function(a) {
            //       return a["name"];
            //     })
            //   }
            // ]
          }
        ]
      };
      console.log("chart data:", JSON.stringify(optionData));
      this.chart.clear();
      this.chart.setOption(optionData);
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById("drugRelatedPerGraph"));

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
}
</style>

