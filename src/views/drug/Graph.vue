<template>
  <div class="graph-container">
    <div id="drugRelatedPerGraph"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";

export default Vue.extend({
  data(): any {
    return {
      chart: null
    };
  },
  mounted() {
    this.chart = echarts.init(document.getElementById("drugRelatedPerGraph"));
    this.chart.clear();

    const optionData = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    };

    this.chart.setOption(optionData);
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
  width: 300px;
  height: 300px;
}
</style>

