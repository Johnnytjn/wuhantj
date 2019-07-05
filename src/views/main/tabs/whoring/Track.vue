<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="generalTableHeaders" :tableData="generalTableData" />
    <v-data-table
      :tableHeaders="movingStatusTableHeaders"
      :tableData="movingStatusTableData"
      title="移动情况"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "../utils";

export default Vue.extend({
  data() {
    return {
      movingStatusTableHeaders: [{ prop: "label" }, { prop: "value" }],
      generalTableHeaders: [{ prop: "label" }, { prop: "value" }]
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
    movingStatusTableData() {
      return [
        {
          label: "深夜长距离移动的天数",
          value: this.getValue("moving_long_distance") + " 天"
        },
        {
          label: "深夜总移动距离",
          value: this.getValue("moving_sum_distance") + " 公里"
        }
      ];
    },
    generalTableData() {
      return [
        {
          label: "频繁更换酒店（每晚3个）的天数",
          value: this.getValue("change_hotel_day") + " 天"
        },
        {
          label: "深夜更换酒店的次数（23-4点）",
          value: this.getValue("change_hotel_time") + " 次"
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


