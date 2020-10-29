<template>
  <div class="graph-container">
    <div id="homeareaGraph" />
    <div id="callGraph"></div>
    <div id="msgGraph" />
    <div v-if="!!graphData">
      <label style="font: bolder 18px sans-serif">主要通话时段</label>
      <div
        v-for="(item, index) in graphData['time']"
        :key="index"
        class="time-item"
      >
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";

export default Vue.extend({
  data(): any {
    return {
      homeareaGraph: null,
      callGraph: null,
      msgGraph: null,
    };
  },
  props: {
    graphData: Object,
    type: String,
  },
  watch: {
    graphData(newData) {
      if (!newData) {
        // if (this.homeareaGraph) {
        //   this.homeareaGraph.clear();
        // }
        // if (this.homeareaGraph) {
        //   this.homeareaGraph.clear();
        // }
        return;
      }
      this.drawHomeareaGraph(newData["home_area"]);
      this.drawCallGraph(newData["call"]);
      this.drawMsgGraph(newData["msg"]);
    },
  },
  methods: {
    drawMsgGraph(graphData) {
      const { bj, zj, bjwd, bjbd } = graphData;

      const optionData = {
        title: { text: "短信分布情况", left: "center" },
        // legend: {},
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}次 ({d}%)",
        },
        series: [
          {
            type: "pie",
            radius: 100,
            data: [
              {
                name: `查询话费`,
                value: graphData["query"],
              },
              {
                name: `查询银行余额`,
                value: graphData["bank"],
              },
              {
                name: `通联短信`,
                value: graphData["other"],
              },
            ],
          },
        ],
      };

      this.msgGraph.clear();
      this.msgGraph.setOption(optionData);
    },
    drawCallGraph(graphData) {
      const { bj, zj, bjwd, bjbd } = graphData;

      const optionData = {
        title: { text: "通话主被叫情况", left: "center" },
        // legend: {},
        graphic: [
          {
            type: "text",
            style: {
              text: "主被叫分布情况",
            },
            left: 90,
            bottom: 30,
          },
          {
            type: "text",
            left: 330,
            bottom: 30,
            style: {
              text: "被叫外地分布情况",
            },
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}次 ({d}%)",
        },
        series: [
          {
            name: "主被叫分布情况",
            type: "pie",
            radius: 60,
            center: ["25%", "50%"],
            data: [
              {
                name: `被叫占比`,
                value: graphData["bj"],
              },
              {
                name: `主叫占比`,
                value: graphData["zj"],
              },
            ],
          },
          {
            name: "被叫外地分布",
            type: "pie",
            radius: 60,
            center: ["65%", "50%"],
            data: [
              {
                name: `被叫本地占比`,
                value: graphData["bjbd"],
              },
              {
                name: `被叫外地占比`,
                value: graphData["bjwd"],
              },
            ],
          },
        ],
      };

      this.callGraph.clear();
      this.callGraph.setOption(optionData);
    },
    drawHomeareaGraph(graphData) {
      const optionData = {
        title: { text: "主要通联号码归属地分布", left: "center" },
        xAxis: {
          type: "category",
          data: graphData.map((x) => x["city_name"]),
          axisLabel: {
            rotate: 30,
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
          name: "号码数量",
          nameLocation: "center",
          nameGap: 20,
        },
        series: [
          {
            data: graphData.map((x) => x.num),
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
          },
        ],
      };
      if (this.homeareaGraph) {
        this.homeareaGraph.clear();
        this.homeareaGraph.setOption(optionData);
      }
    },
  },
  mounted() {
    const that = this;
    this.homeareaGraph = echarts.init(
      document.getElementById("homeareaGraph"),
      null,
      {
        renderer: "svg",
      }
    );
    this.callGraph = echarts.init(document.getElementById("callGraph"), null, {
      renderer: "svg",
    });
    this.msgGraph = echarts.init(document.getElementById("msgGraph"), null, {
      renderer: "svg",
    });
  },
});
</script>

<style scoped>
.graph-container {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  height: 100%;
  flex-wrap: wrap;
  margin: 20px;
}

#homeareaGraph {
  width: 400px;
  height: 300px;
  /* height: 500px; */
}
#callGraph {
  width: 600px;
  height: 300px;
  /* height: 500px; */
}
#msgGraph {
  width: 600px;
  height: 300px;
  /* height: 500px; */
}

.time-item {
  margin-top: 10px;
  background-color: rgb(97, 160, 168);
  padding: 5px;
}
</style>

