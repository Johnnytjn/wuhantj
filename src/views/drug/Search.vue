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
        class="input-new-tag el-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        placeholder="请输入目标人员电话并回车"
      ></el-input>
      <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
    </div>
    <div class="button-container">
      <el-button type="primary">搜索</el-button>
      <el-button>清空</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      dynamicTags: ["Tag 1", "Tag 2", "Tag 3"],
      inputVisible: true,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      // this.inputVisible = false;
      this.inputValue = "";
    }
  }
});
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 200px;
  margin-left: 10px;
  vertical-align: bottom;
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


