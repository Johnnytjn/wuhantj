<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="generalTableHeaders" :tableData="generalTableData" />
    <data-table :tableHeaders="level1TableHeaders" :tableData="level1TableData" title="一级关系人涉黄" />
    <data-table
      :tableHeaders="level1HasStudioTableHeaders"
      :tableData="level1HasStudioTableData"
      title="一级关系人有整容机构/摄像工作室"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "../utils";

export default Vue.extend({
  data() {
    return {
      level1HasStudioTableHeaders: [
        { prop: "name", label: "机构" },
        { prop: "phone", label: "电话" }
      ],
      level1TableHeaders: [
        { prop: "name", label: "姓名" },
        { prop: "sfzh", label: "身份证" }
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
    level1HasStudioTableData() {
      return this.getValue("zr_associate");
    },
    level1TableData() {
      return this.getValue("sh_associate");
    },
    generalTableData() {
      return [
        {
          label: "短信涉黄关键词出现次数",
          value: this.getValue("sh_keyword") + " 次"
        },
        { label: "贷款短信数量", value: this.getValue("dk_message") + " 条" },
        { label: "涉黄短信数量", value: this.getValue("sh_message") + " 条" },
        {
          label: "与涉黄人员联系次数",
          value: this.getValue("sh_contact") + " 次"
        },
        {
          label: "与整容摄像机构联系次数",
          value: this.getValue("zr_contact") + " 次"
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


