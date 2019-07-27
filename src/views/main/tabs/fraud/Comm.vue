<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="smsTableHeaders" :tableData="smsTableData" />
    <v-data-table :tableHeaders="callTableHeaders" :tableData="callTableData" title="通话情况" />
    <v-data-table :tableHeaders="eventTableHeaders" :tableData="eventTableData" title="电围事件" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "../utils";

export default Vue.extend({
  data() {
    return {
      callTableHeaders: [{ prop: "label", label: "不显示" }, { prop: "value" }],
      eventTableHeaders: [
        { prop: "label", label: "不显示" },
        { prop: "value" }
      ],
      smsTableHeaders: [{ prop: "label", label: "不显示" }, { prop: "value" }]
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
    callTableData() {
      const callData = this.getValue("call");
      return [
        {
          label: "主叫次数",
          value: callData["zj"] + " 次"
        },
        {
          label: "被叫次数",
          value: callData["bj"] + " 次"
        },
        { label: "被叫号码外地占比", value: callData["bjwd"] + " %" },
        {
          label: "电话查询银行及话费次数",
          value: callData["query_num"] + " 次"
        },
        {
          label: "电话查询银行及话费频率",
          value: callData["query_freq"] + " 次/天"
        },
        {
          label: "主叫平均通话时间",
          value: callData["zj_aver"] + " 分钟"
        },
        {
          label: "被叫平均通话时间",
          value: callData["bj_aver"] + " 分钟"
        }
      ];
    },
    eventTableData() {
      const eventData = this.getValue("event");
      const dataMap = { 0: "4G", 1: "2/3G" };
      return [
        {
          label: "手机制式",
          value: dataMap[eventData.sjzs]
        }
      ];
    },
    smsTableData() {
      const smsData = this.getValue("sms");
      return [
        {
          label: "短信查询话费次数",
          value: smsData["query_num"] + " 次"
        },
        {
          label: "短信查询话费频率",
          value: smsData["query_freq"] + " 次/天"
        },
        { label: "短信查询银行次数", value: smsData["bank_num"] + " 次" },
        {
          label: "短信查询银行频率",
          value: smsData["bank_freq"] + " 次/天"
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


