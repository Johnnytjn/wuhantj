<template>
  <div class="info-personal">
    <div
      style="
        display: flex;
        width: 100%;
        margin-bottom: 20px;
        align-items: flex-end;
      "
    >
      <div style="width: 50%">
        <data-field
          label="归属地"
          :value="getValue('homeArea')"
          style="margin-top: unset"
        />
      </div>
    </div>
    <div>
      <data-table
        :tableHeaders="activeRegionTableHeaders"
        :tableData="activeRegionTableData()"
        title="主要活动区域（CI）:"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "./utils";

export default Vue.extend({
  data() {
    return {
      activeRegionTableHeaders: [
        { prop: "code", label: "编码" },
        { prop: "region", label: "区域地址" },
      ],
    };
  },
  props: {
    personData: Object,
  },
  methods: {
    getValue(name) {
      return getPropValue(this.personData, name);
    },
    activeRegionTableData() {
      return this.getValue("activeRegion");
    },
  },
});
</script>

<style scoped>
.info-personal {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>


