<template>
  <div class="info-comm">
    <data-table :tableHeaders="recordTableHeaders" :tableData="recordTableData"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "./utils";

export default Vue.extend({
  data() {
    return {
      recordTableHeaders: [
        { prop: "eventNo", label: "案件编号" },
        { prop: "eventName", label: "案件名称" },
        { prop: "eventType", label: "案件类别" }
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
    recordTableData() {
      return this.getValue("criminalRecord");
    }
  } as any
});
</script>

<style scoped>
.info-comm {
  /* display: flex; */
}
</style>


