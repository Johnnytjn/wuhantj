<template>
  <div id="person-container">
    <el-tabs type="card">
      <el-tab-pane :label="type==='fraud'?'基本信息':'个人信息'">
        <component :is="tabPersonal" :personData="personalData" />
      </el-tab-pane>
      <el-tab-pane label="通联信息">
        <component :is="tabComm" :personData="commData" />
      </el-tab-pane>
      <el-tab-pane label="轨迹信息" v-if="type!=='fraud'">
        <component :is="tabTrack" :personData="trackData" />
      </el-tab-pane>
      <el-tab-pane label="前科信息" v-if="type!=='fraud'">
        <component :is="tabCriminalRecord" :personData="criminalRecordData" />
      </el-tab-pane>
      <el-tab-pane label="寄送信息" v-if="type==='drug'">
        <component :is="tabPostInfo" :personData="postInfoData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DrugTabPersonal from "./tabs/drug/Personal.vue";
import DrugTabComm from "./tabs/drug/Comm.vue";
import DrugTabTrack from "./tabs/drug/Track.vue";
import DrugTabCriminalRecord from "./tabs/drug/CriminalRecord.vue";
import DrugTabPostInfo from "./tabs/drug/PostInfo.vue";
import WhoringTabPersonal from "./tabs/whoring/Personal.vue";
import WhoringTabComm from "./tabs/whoring/Comm.vue";
import WhoringTabTrack from "./tabs/whoring/Track.vue";
import WhoringTabCriminalRecord from "./tabs/whoring/CriminalRecord.vue";
// import WhoringTabPostInfo from "./tabs/whoring/PostInfo.vue";
import FraudTabPersonal from "./tabs/fraud/Personal.vue";
import FraudTabComm from "./tabs/fraud/Comm.vue";

const TAB_COMPONENTS = {
  drug: {
    TabPersonal: DrugTabPersonal,
    TabComm: DrugTabComm,
    TabTrack: DrugTabTrack,
    TabCriminalRecord: DrugTabCriminalRecord,
    TabPostInfo: DrugTabPostInfo
  },
  whoring: {
    TabPersonal: WhoringTabPersonal,
    TabComm: WhoringTabComm,
    TabTrack: WhoringTabTrack,
    TabCriminalRecord: WhoringTabCriminalRecord
  },
  fraud: {
    TabPersonal: FraudTabPersonal,
    TabComm: FraudTabComm
  }
};

export default Vue.extend({
  props: {
    personData: Object,
    type: String
  },
  watch: {
    personData(data) {
      const elem = document.querySelector("#person-container") as any;
      if (data && elem) {
        elem.style.opacity = "1";
      } else {
        elem!.style.opacity = "0";
      }
    }
  },
  computed: {
    tabPersonal() {
      return TAB_COMPONENTS[this.type]["TabPersonal"];
    },
    tabComm() {
      return TAB_COMPONENTS[this.type]["TabComm"];
    },
    tabTrack() {
      return TAB_COMPONENTS[this.type]["TabTrack"];
    },
    tabCriminalRecord() {
      return TAB_COMPONENTS[this.type]["TabCriminalRecord"];
    },
    tabPostInfo() {
      return TAB_COMPONENTS[this.type]["TabPostInfo"];
    },
    personalData() {
      return (
        this.personData &&
        this.personData[this.type === "fraud" ? "basic-info" : "personInfo"]
      );
    },
    commData() {
      return (
        this.personData &&
        this.personData[this.type === "fraud" ? "link_info" : "linkInfo"]
      );
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

#person-container {
  transition: all 1s;
  opacity: 0;
}
</style>


