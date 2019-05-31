<template>
  <div>
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="个人信息">
        <div class="info-personal">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559300925616&di=855031b1140cd0ac934dbaa9dd728a6b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171030%2F26ed195281334ba4b1752394b60eb29a.jpeg"
            height="200px"
            width="160px"
          >
          <div style="flex-grow:2;margin-left:20px;">
            <div style="color:#fff;font-weight:800;">
              <span
                style="background-color:#325c80;padding:10px;vertical-align:-webkit-baseline-middle;"
              >身份证号（直接显示）</span>
              <span
                style="background-color:#FF504F;padding:10px;margin-left:10px;vertical-align:-webkit-baseline-middle;"
              >分数</span>
            </div>
            <div style="display:flex;">
              <div style="width:50%">
                <data-field label="姓名" value="张三"/>
                <data-field label="年龄" value="张三"/>
                <data-field label="婚姻状况" value="张三"/>
              </div>
              <div style="width:50%">
                <data-field label="性别" value="张三"/>
                <data-field label="出生日期" value="张三"/>
                <data-field label="文化程度" value="张三"/>
              </div>
            </div>
            <div>
              <data-field label="地址" value="张三"/>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通联信息">Config</el-tab-pane>
      <el-tab-pane label="轨迹信息">Role</el-tab-pane>
      <el-tab-pane label="前科信息">Task</el-tab-pane>
      <el-tab-pane label="寄送信息">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DataField from "./DataField.vue";
export default Vue.extend({
  components: {
    DataField
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
});
</script>

<style scoped>
.info-personal {
  display: flex;
  text-align: left;
}

.el-tab-pane {
  padding: 0px 20px 0px 20px !important;
}
</style>


