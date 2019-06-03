<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="generalTableHeaders" :tableData="generalTableData"/>
    <data-table
      :tableHeaders="toDrugSourceTableHeaders"
      :tableData="toDrugSourceTableData"
      title="多次前往毒源地"
    />
    <data-table
      :tableHeaders="dayHideNightOutTableHeaders"
      :tableData="dayHideNightOutTableData"
      title="昼伏夜出"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "./utils";
export default Vue.extend({
  data() {
    return {
      toDrugSourceTableHeaders: [
        { prop: "date", label: "时间" },
        { prop: "place", label: "地点" }
      ],
      dayHideNightOutTableHeaders: [
        { prop: "startTime", label: "开始时间" },
        { prop: "endtime", label: "结束时间" },
        { prop: "dateNum", label: "天数" },
        { prop: "totalLAC", label: "总体LAC数量" }
      ],
      generalTableHeaders: [
        { prop: "label", label: "不显示" },
        { prop: "value" }
      ]
    };
  },
  props: {
    personData: Object
  },
  methods: {
    getValue(name) {
      return getPropValue(this.personData, name);
    }
  },
  computed: {
    toDrugSourceTableData() {
      return this.getValue("toPoisonPlace");
    },
    dayHideNightOutTableData() {
      return this.getValue("zfyc");
    },
    generalTableData() {
      return [
        { label: "酒店住宿次数", value: this.getValue("hotelTimes") + " 次" },
        {
          label: "频繁更换酒店次数",
          value: this.getValue("changeHotelTimes") + " 次"
        },
        {
          label: "同时入住两个酒店次数",
          value: this.getValue("checkInMultiHotel") + " 次"
        }
      ];
    }
  } as any
});
</script>

<style scoped>
.info-comm {
  /* display: flex; */
}
</style>


