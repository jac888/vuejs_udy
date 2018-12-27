<template>
 <el-table
    v-if="tableData.length > 0"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      :formatter="dateFormat"  
      label="交易日期"
      width="250">
    </el-table-column>
 </el-table>
</template>

<script>
import * as moment from "moment";
export default {
  name: "fundlist",
  components: {},
  data() {
    return {
      tableData: [{}, {}]
    };
  },
  created() {
    this.getTradeData();
  },
  methods: {
    //get table data
    getTradeData() {
      this.$axios
        .get("/api/profiles")
        .then(res => {
          //console.log(res);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "123";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script> 
<style scoped>
</style>


