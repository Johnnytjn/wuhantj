<template>
  <div class="info-personal" id="person-container">
    <general-person :personData="personData" v-if="type !== 'fraud'" />
    <fraud-person :personData="personData" v-if="type === 'fraud'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPropValue } from "./utils";

import GeneralPerson from "./GeneralPerson.vue";
import FraudPerson from "./FraudPerson.vue";

export default Vue.extend({
  components: { GeneralPerson, FraudPerson },
  props: {
    personData: Object,
    type: String,
  },
  watch: {
    personData(data) {
      const elem = document.querySelector("#person-container") as any;
      if (data && elem) {
        elem.style.opacity = "1";
      } else {
        elem!.style.opacity = "0";
      }
    },
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

#person-container {
  transition: all 0.5s;
  opacity: 0;
  width: 100%;
}
</style>


