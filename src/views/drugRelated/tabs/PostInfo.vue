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
import { getPropValue } from "./utils";

export default Vue.extend({
  data() {
    return {
      sensitivePlacePostTableHeaders: [
        { prop: "sensTime", label: "时间" },
        { prop: "sensAddress", label: "地点" }
      ],
      packageOverWeightTableHeaders: [
        { prop: "time", label: "时间" },
        { prop: "sendAddress", label: "寄出地点" },
        { prop: "productName", label: "品名" },
        { prop: "weight", label: "重量" }
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
    packageOverWeightTableData() {
      return this.getValue("overWeightPackage");
    },
    sensitivePlacePostTableData() {
      return this.getValue("sensitiveAddress");
    },
    generalTableData() {
      return [
        {
          label: "经常变更寄送地址",
          value: this.getValue("changeAddress") + " 次"
        },
        { label: "无寄件地址", value: this.getValue("noAddress") + " 次" },
        {
          label: "收件地址不详",
          value: this.getValue("unclearAddress") + " 次"
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


