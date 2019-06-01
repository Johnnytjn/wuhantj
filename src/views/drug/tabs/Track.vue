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
export default Vue.extend({
  data() {
    return {
      toDrugSourceTableHeaders: [
        { prop: "datetime", label: "时间" },
        { prop: "location", label: "地点" }
      ],
      toDrugSourceTableData: [
        { datetime: "2020-01-01", location: "云南昆明" },
        { datetime: "2020-01-01", location: "云南昆明" },
        { datetime: "2020-01-01", location: "云南昆明" }
      ],
      dayHideNightOutTableHeaders: [
        { prop: "startDatetime", label: "开始时间" },
        { prop: "endDatetime", label: "结束时间" },
        { prop: "totalDays", label: "天数" },
        { prop: "totalLAC", label: "总体LAC数量" }
      ],
      dayHideNightOutTableData: [
        {
          startDatetime: "2020-01-01",
          endDatetime: "2020-01-01",
          totalDays: 12,
          totalLAC: 44
        },
        {
          startDatetime: "2020-01-01",
          endDatetime: "2020-01-01",
          totalDays: 12,
          totalLAC: 44
        },
        {
          startDatetime: "2020-01-01",
          endDatetime: "2020-01-01",
          totalDays: 12,
          totalLAC: 44
        }
      ],
      generalTableHeaders: [
        { prop: "label", label: "不显示" },
        { prop: "value" }
      ],
      generalTableData: [
        { label: "酒店住宿次数", value: "x次" },
        { label: "频繁更换酒店次数", value: "x次" },
        { label: "同时入住两个酒店次数", value: "x次" }
      ]
    };
  }
});
</script>

<style scoped>
.info-comm {
  /* display: flex; */
}
</style>


