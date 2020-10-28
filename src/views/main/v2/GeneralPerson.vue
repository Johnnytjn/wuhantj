<template>
  <div class="info-personal">
    <img :src="getValue('photo')" height="130px" width="100px" />
    <div style="flex-grow: 2; margin-left: 20px">
      <div style="color: #fff; font-weight: 800">
        <span
          style="
            background-color: #325c80;
            padding: 10px;
            vertical-align: -webkit-baseline-middle;
          "
          >{{ getValue("sfzh") }}</span
        >
      </div>
      <div style="display: flex">
        <div style="width: 50%">
          <data-field label="姓名" :value="getValue('name')" />
          <data-field label="年龄" :value="getValue('age')" />
        </div>
        <div style="width: 50%">
          <data-field label="性别" :value="getValue('sex') | decode('sex')" />
        </div>
      </div>
      <div>
        <data-field label="地址" :value="getValue('homeAddress')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "./utils";

export default Vue.extend({
  props: {
    personData: Object,
  },
  methods: {
    getValue(name) {
      return getPropValue(this.personData, name);
    },
  },
});
</script>

<style scoped>
.info-personal {
  display: flex;
}
</style>


