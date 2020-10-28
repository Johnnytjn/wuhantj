<template>
  <div class="container">
    <!-- drug and whoring  -->
    <!-- <div class="tag-container" v-if="type === 'drug' || type === 'whoring'">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        type="text"
        maxlength="11"
        minlength="11"
        class="input-new-tag el-tag"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputBlur"
        placeholder="请输入目标人员电话并回车"
      ></el-input>
    </div>
    <div class="button-container" v-if="type === 'drug' || type === 'whoring'">
      <el-button
        type="primary"
        @click="submit"
        :disabled="dynamicTags.length === 0"
        >搜索</el-button
      >
      <el-button @click="reset" :disabled="dynamicTags.length === 0"
        >清空</el-button
      >
    </div> -->
    <!-- fraud  -->
    <div class="tag-container">
      <el-input
        type="text"
        maxlength="11"
        minlength="11"
        class="input-new-tag el-tag"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        :placeholder="
          type === 'fraud' ? '请输入嫌疑电话' : '请输入目标人员电话'
        "
        @keyup.enter.native="submitFraud"
      ></el-input>
    </div>
    <div class="button-container">
      <el-button
        type="primary"
        @click="submitFraud"
        :disabled="testFraudInput()"
        >搜索</el-button
      >
      <el-button @click="resetFraud" :disabled="inputValue === ''"
        >清空</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    onSearch: Function,
    type: String,
  },
  data() {
    return {
      dynamicTags: new Array(),
      inputValue: "",
    };
  },
  watch: {
    type(newData, oldData) {
      if (newData !== oldData) {
        this.reset();
        this.inputValue = "";
      }
    },
  },
  methods: {
    submit() {
      this.$clearMessage();
      this.onSearch(this.dynamicTags);
    },
    reset() {
      this.$clearMessage();
      this.dynamicTags = [];
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputBlur() {
      this.inputValue = "";
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;

      if (/\d{11}/.test(inputValue)) {
        this.dynamicTags.push(inputValue);
        this.inputValue = "";
      } else {
        this.$error("请输入长度为11位的手机号");
      }
    },
    testFraudInput() {
      return !/\d{11}/.test(this.inputValue);
    },
    resetFraud() {
      this.inputValue = "";
    },
    submitFraud() {
      if (this.testFraudInput()) {
        this.$error("请输入长度为11位的手机号");
      } else {
        this.onSearch([this.inputValue]);
      }
    },
  } as any,
});
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.input-new-tag {
  width: 200px;
  margin-left: 10px;
  /* vertical-align: bottom; */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.button-container {
  margin-left: 30px;
}

.tag-container {
  max-width: 600px;
}
</style>


