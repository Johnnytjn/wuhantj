<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="generalTableHeaders" :tableData="generalTableData"/>
    <data-table
      :tableHeaders="sensitivePlacePostTableHeaders"
      :tableData="sensitivePlacePostTableData"
      title="敏感地寄出包裹"
    />
    <data-table
      :tableHeaders="packageOverWeightTableHeaders"
      :tableData="packageOverWeightTableData"
      title="包裹超重"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      sensitivePlacePostTableHeaders: [
        { prop: "datetime", label: "时间" },
        { prop: "location", label: "地点" }
      ],
      sensitivePlacePostTableData: [
        { datetime: "2020-01-01", location: "云南昆明" },
        { datetime: "2020-01-01", location: "云南昆明" },
        { datetime: "2020-01-01", location: "云南昆明" }
      ],
      packageOverWeightTableHeaders: [
        { prop: "datetime", label: "时间" },
        { prop: "locationFrom", label: "寄出地点" },
        { prop: "name", label: "品名" },
        { prop: "weight", label: "重量" }
      ],
      packageOverWeightTableData: [
        {
          datetime: "2020-01-01",
          locationFrom: "新疆",
          name: "食品",
          weight: "44Kg"
        },
        {
          datetime: "2020-01-01",
          locationFrom: "新疆",
          name: "食品",
          weight: "44Kg"
        },
        {
          datetime: "2020-01-01",
          locationFrom: "新疆",
          name: "食品",
          weight: "44Kg"
        }
      ],
      generalTableHeaders: [
        { prop: "label", label: "不显示" },
        { prop: "value" }
      ],
      generalTableData: [
        { label: "经常变更寄送地址", value: "x次" },
        { label: "无寄件地址", value: "x次" },
        { label: "收件地址不详", value: "x次" }
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


