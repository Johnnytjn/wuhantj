<template>
  <div>
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="个人信息">
        <tab-personal/>
      </el-tab-pane>
      <el-tab-pane label="通联信息">
        <tab-comm/>
      </el-tab-pane>
      <el-tab-pane label="轨迹信息">
        <tab-track/>
      </el-tab-pane>
      <el-tab-pane label="前科信息">
        <tab-criminal-record/>
      </el-tab-pane>
      <el-tab-pane label="寄送信息">
        <tab-post-info/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TabPersonal from "./tabs/Personal.vue";
import TabComm from "./tabs/Comm.vue";
import TabTrack from "./tabs/Track.vue";
import TabCriminalRecord from "./tabs/CriminalRecord.vue";
import TabPostInfo from "./tabs/PostInfo.vue";

export default Vue.extend({
  components: {
    TabPersonal,
    TabComm,
    TabTrack,
    TabCriminalRecord,
    TabPostInfo
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
});
</script>

<style scoped>
.el-tab-pane {
  text-align: left;
  padding: 0px 20px 0px 20px !important;
}
</style>


