<template>
   <el-table :data="tableData" border style="width: 100%" v-if="tableData.length > 0">    
    <el-table-column label="是否啟用" >
        <template slot-scope="scope">
        <el-checkbox :checked="tableData.enabled" @change="checked=>checkRow(checked, scope.row)"/>
      </template>
    </el-table-column>
     <el-table-column label="交易所" prop="exchange" align="center" :formatter="exgFormat">
      </el-table-column>
      <el-table-column label="API密鑰" prop="apikey" align="center" >
      </el-table-column>
      <el-table-column label="API密碼" prop="apisecret" align="center" >
      </el-table-column>
      <el-table-column label="加入日期" prop="dateAdded" align="center" :formatter="dateFormat" >
      </el-table-column>
   </el-table>
</template>

<script>
import * as moment from "moment";
export default {
  name: "fundlist",
  components: {},
  props: {
    option: {
      type: Object,
      default: () => {},
      required: false
    }
  },
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
        .get("/api/user/APIKEYs/5c2b3c068918d349050d6896")
        .then(res => {
          console.log(`res: ${JSON.stringify(res)}`);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log("error : " + err);
        });
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    exgFormat: function(row, column, cellValue) {
      let rtnVal = "";
      console.log(cellValue);
      console.log(typeof cellValue);
      switch (cellValue) {
        case "0":
        case 0:
          rtnVal = "幣安";
          break;
        case "1":
        case 1:
          rtnVal = "OKEx";
          break;
        case "2":
        case 2:
          rtnVal = "Bitfinex";
          break;
        default:
          rtnVal = "";
          break;
      }
      return rtnVal;
    },
    checkRow(checked, row) {
      console.log(`checked:${checked}`);
      console.log(`row:${JSON.stringify(row)}`);
    }
  },
  computed: {
    // cmp: {
    //   get: function(row, column, cellValue) {
    //     console.log(12345);
    //     console.log(cellValue);
    //     return this.tableData.enabled;
    //   },
    //   set: function(val) {
    //     this.$data.cmpVariable = val;
    //   }
    // }
  }
};
</script> 
<style scoped>
</style>


