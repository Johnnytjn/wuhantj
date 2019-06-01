<template>
  <div class="info-comm">
    <data-table :tableHeaders="recordTableHeaders" :tableData="recordTableData"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      recordTableHeaders: [
        { prop: "num", label: "案件编号" },
        { prop: "name", label: "案件名称" },
        { prop: "type", label: "案件类别" }
      ],
      recordTableData: [
        { num: "111-2433423", name: "云南特大盗窃案", type: "盗窃" },
        { num: "111-2433423", name: "云南特大盗窃案", type: "盗窃" },
        { num: "111-2433423", name: "云南特大盗窃案", type: "盗窃" }
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


