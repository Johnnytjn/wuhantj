<template>
  <div style="margin-top:20px;">
    <label style="font-weight:900">{{label}}:</label>
    &nbsp;
    <span>{{value}}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    label: String,
    value: String
  }
});
</script>

