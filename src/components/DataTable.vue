<template>
  <div style="margin-bottom:20px;">
    <div style="margin-bottom:10px;" v-if="title">{{title}}</div>
    <el-table :data="tableData" style="width: 100%" border>
      <template v-for="(u,i) in tableHeaders">
        <el-table-column :key="i" :prop="u.prop" :label="u.label"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    tableData: Array,
    tableHeaders: Array,
    title: String
  }
});
</script>

