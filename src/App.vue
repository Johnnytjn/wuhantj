<template>
  <div id="app">
    <el-header style="height:10%;">
      <div class="header">
        <span class="title">武汉技侦XX系统</span>
      </div>
    </el-header>
    <el-container style="flex-grow:2; border: 1px solid #eee;height:90%;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="/drug" class="el-menu-vertical-demo" router>
          <el-menu-item index="/drug">
            <i class="el-icon-menu"></i>
            <span>涉毒研判模型</span>
          </el-menu-item>
          <el-menu-item index="/" disabled>
            <i class="el-icon-menu"></i>
            <span>涉黄研判模型</span>
          </el-menu-item>
          <el-menu-item index="/" disabled>
            <i class="el-icon-menu"></i>
            <span>电信诈骗研判模型</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="height:100%;">
        <el-main style="height:100%;">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import DataField from "./components/DataField.vue";
import DataTable from "./components/DataTable.vue";
import VDataTable from "./components/VerticalDataTable.vue";

Vue.component("data-field", DataField);
Vue.component("data-table", DataTable);
Vue.component("v-data-table", VDataTable);

Vue.prototype.$success = function(message) {
  this.$message({
    message,
    type: "success"
  });
};

Vue.prototype.$error = function(message) {
  this.$message({
    message,
    type: "error",
    duration: 0,
    showClose: true,
    dangerouslyUseHTMLString: true
  });
};

export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}

body {
  margin: 0px;
  height: 100%;
}

.el-aside {
  text-align: left;
}

.el-header {
  padding: 0px !important;
}

.title {
  font-size: 24px;
  margin-left: 40px;
}

.header {
  height: 100%;
  background-color: rgb(11, 55, 146);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding-right: 20px;
  display: flex;
}

html {
  height: 100%;
}

.el-main {
  padding: 0px !important;
}
</style>
