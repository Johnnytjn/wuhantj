<template>
  <div class="info-personal">
    <div style="display:flex;width:100%;margin-bottom:20px;align-items:flex-end;">
      <div style="width:50%">
        <data-field label="归属地" :value="getValue('home_area')" style="margin-top:unset" />
      </div>
      <div style="width:50%;display:flex;align-items:flex-end;">
        <label style="font-weight:900">可疑程度：</label>
        <span
          style="color:#fff;background-color:#FF504F;padding:5px 10px 5px 10px;margin-left:10px;vertical-align:-webkit-baseline-middle;"
        >{{getValue("score")+" %"}}</span>
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
import { getPropValue } from "../utils";

export default Vue.extend({
  data() {
    return {
      activeRegionTableHeaders: [
        { prop: "CI", label: "CI" },
        { prop: "address", label: "区域地址" }
      ]
    };
  },
  props: {
    personData: Object
  },
  methods: {
    getValue(name) {
      return getPropValue(this.personData, name);
    },
    activeRegionTableData() {
      return this.getValue("active_region");
    }
  }
});
</script>

<style scoped>
.info-personal {
  display: flex;
  flex-direction: column;
}
</style>


