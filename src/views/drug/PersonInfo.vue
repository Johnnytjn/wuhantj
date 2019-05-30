<template>
  <div>
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="个人信息">User</el-tab-pane>
      <el-tab-pane label="通联信息">Config</el-tab-pane>
      <el-tab-pane label="轨迹信息">Role</el-tab-pane>
      <el-tab-pane label="前科信息">Task</el-tab-pane>
      <el-tab-pane label="寄送信息">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
});
</script>

