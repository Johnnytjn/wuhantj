<template>
  <div>
    <el-tabs type="card">
      <el-tab-pane label="个人信息">
        <tab-personal :personData="personalData"/>
      </el-tab-pane>
      <el-tab-pane label="通联信息">
        <tab-comm :personData="commData"/>
      </el-tab-pane>
      <el-tab-pane label="轨迹信息">
        <tab-track :personData="trackData"/>
      </el-tab-pane>
      <el-tab-pane label="前科信息">
        <tab-criminal-record :personData="criminalRecordData"/>
      </el-tab-pane>
      <el-tab-pane label="寄送信息">
        <tab-post-info :personData="postInfoData"/>
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
  props: {
    personData: Object
  },
  computed: {
    personalData() {
      return this.personData && this.personData["personInfo"];
    },
    commData() {
      return this.personData && this.personData["linkInfo"];
    },
    trackData() {
      return this.personData && this.personData["trackInfo"];
    },
    criminalRecordData() {
      return this.personData && this.personData["criminalRecord"];
    },
    postInfoData() {
      return this.personData && this.personData["postInfo"];
    }
  } as any,
  methods: {}
});
</script>

<style scoped>
.el-tab-pane {
  text-align: left;
  padding: 0px 20px 0px 20px !important;
}
</style>


