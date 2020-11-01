<template>
  <div class="tag-view">
    <div class="tag-view-tags">
      <div id="tag-wordcloud" />
    </div>
    <div class="tag-view-types">
      <div
        :key="typeName"
        v-for="[typeName, tags] in Object.entries(tagData.types)"
        class="tag-view-type"
      >
        <div class="tag-view-typename">{{ typeName }}</div>
        <el-tag
          :key="tag.name"
          v-for="tag in tags"
          :disable-transitions="false"
          :type="tag.type === 1 ? 'danger' : ''"
        >
          {{ tag.name }}</el-tag
        >
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import "echarts-wordcloud";

export default Vue.extend({
  props: {
    tagData: Object,
  },
  data(): any {
    return {
      chart: null,
    };
  },
  watch: {
    tagData(newData) {
      this.initGraph(newData);
    },
  },
  methods: {
    initGraph(newData) {
      if (!this.chart) {
        return;
      }

      const wordList = Object.entries(newData["tags"]).map(([name, value]) => ({
        name,
        value,
      }));

      const optionData = {
        animation: false,
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            //maskImage: maskImage,
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            right: null,
            bottom: null,
            sizeRange: [6, 60],
            rotationRange: [-45, 90],
            autoSize: {
              enable: true,
              minSize: 6,
            },
            textPadding: 0,
            // rotationStep: 45,
            // gridSize: 8,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                // Color can be a callback function or a color string
                color: function () {
                  // Random color
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: wordList,
          },
        ],
      };
      //   this.chart.clear();
      this.chart.setOption(optionData);
      setTimeout(() => {
        const { width, height } = document
          .querySelector(".tag-view-tags")
          .getBoundingClientRect();
        this.chart.resize({ width, height });
      }, 500);
    },
  },
  mounted() {
    const that = this;
    this.chart = echarts.init(document.getElementById("tag-wordcloud"), null, {
      renderer: "svg",
    });
    window.onresize = this.chart.resize;
    if (this.tagData) {
      this.initGraph(this.tagData);
    }
  },
}) as any;
</script> 

<style lang="scss" scoped>
.tag-view {
  width: 100%;
  display: flex;
  height: 400px;

  .tag-view-tags {
    width: 50%;
    padding: 32px;
  }
  .tag-view-types {
    width: 50%;
    text-align: left;
    padding: 32px;
    overflow-y: auto;

    .tag-view-type {
      margin-bottom: 16px;

      .tag-view-typename {
        margin-bottom: 5px;
      }

      .el-tag {
        margin-right: 16px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>