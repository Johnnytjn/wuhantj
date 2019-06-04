<template>
  <div class="container">
    <div class="tag-container">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
      <el-input
        type="text"
        maxlength="11"
        minlength="11"
        clearable
        class="input-new-tag el-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputBlur"
        placeholder="请输入目标人员电话并回车"
      ></el-input>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="submit" :disabled="dynamicTags.length===0">搜索</el-button>
      <el-button @click="reset" :disabled="dynamicTags.length===0">清空</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    onSearch: Function
  },
  data() {
    return {
      dynamicTags: new Array(),
      inputVisible: true,
      inputValue: ""
    };
  },
  methods: {
    submit() {
      this.onSearch(this.dynamicTags);
    },
    reset() {
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
    }
  } as any
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


