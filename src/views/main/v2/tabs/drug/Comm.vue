<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="generalTableHeaders" :tableData="generalTableData"/>
    <data-table
      :tableHeaders="sensitiveMobilesTableHeaders"
      :tableData="sensitiveMobilesTableData"
      title="使用敏感地手机号码"
    />
    <data-table :tableHeaders="level1TableHeaders" :tableData="level1TableData" title="一级关系人涉毒"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "../utils";

export default Vue.extend({
  data() {
    return {
      sensitiveMobilesTableHeaders: [
        { prop: "phoneNum", label: "手机号" },
        { prop: "place", label: "归属地" }
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
    sensitiveMobilesTableData() {
      return this.getValue("sensitivePhone");
    },
    level1TableData() {
      return this.getValue("firstAssociate");
    },
    generalTableData() {
      return [
        { label: "一机多卡，一卡多机", value: this.getValue("jk") + " 次" },
        { label: "频繁换机换卡", value: this.getValue("pfhjhk") + " 次" },
        { label: "异常开关机", value: this.getValue("yckgj") + " 次" },
        { label: "专机专卡", value: this.getValue("zjzk") },
        { label: "短信出现关键词", value: this.getValue("keyword") + " 次" },
        {
          label: "与敏感地通联",
          value: this.getValue("sensitivePlace").join(",")
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


