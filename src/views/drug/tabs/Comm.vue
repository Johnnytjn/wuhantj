<template>
  <div class="info-comm">
    <v-data-table :tableHeaders="generalTableHeaders" :tableData="generalTableData"/>
    <data-table
      :tableHeaders="sensitiveMobilesTableHeaders"
      :tableData="sensitiveMobilesTableData"
      title="使用敏感地手机号码"
    />
    <data-table :tableHeaders="level1TableHeaders" :tableData="level1TableData" title="一级关系人涉毒"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      sensitiveMobilesTableHeaders: [
        { prop: "mobile", label: "手机号" },
        { prop: "location", label: "归属地" }
      ],
      sensitiveMobilesTableData: [
        { mobile: "1234556767", location: "云南昆明" },
        { mobile: "1234556767", location: "云南昆明" },
        { mobile: "1234556767", location: "云南昆明" }
      ],
      level1TableHeaders: [
        { prop: "name", label: "姓名" },
        { prop: "cardnum", label: "身份证" }
      ],
      level1TableData: [
        { name: "张三", cardnum: "234329742983423" },
        { name: "张三", cardnum: "234329742983423" },
        { name: "张三", cardnum: "234329742983423" },
        { name: "张三", cardnum: "234329742983423" }
      ],
      generalTableHeaders: [
        { prop: "label", label: "不显示" },
        { prop: "value" }
      ],
      generalTableData: [
        { label: "一机多卡，一卡多机", value: "x次" },
        { label: "频繁换机换卡", value: "x次" },
        { label: "异常开关机", value: "x次" },
        { label: "专机专卡", value: "12312312312" },
        { label: "短信出现关键词", value: "x次" },
        { label: "与敏感地通联", value: "云南，西藏" }
      ]
    };
  }
});
</script>

<style scoped>
.info-comm {
  /* display: flex; */
}
</style>


