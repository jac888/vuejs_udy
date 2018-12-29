<template>
   <el-table :data="tableData" border style="width: 100%">    
      <el-table-column label="是否啟用" prop="enabled" align="center" >
         <template slot-scope="scope">
          <el-checkbox/>
        </template>
      </el-table-column>
     <el-table-column label="交易所" prop="exchange" align="center" >
      </el-table-column>
      <el-table-column label="API密鑰" prop="apikey" align="center" >
      </el-table-column>
      <el-table-column label="API密碼" prop="apisecret" align="center" >
      </el-table-column>
      <el-table-column label="加入日期" prop="dateAdded" align="center" >
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
        .get("/api/user/APIKEYs/5c27cb59c03179285fadd566")
        .then(res => {
          console.log(res);
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
    },
    exgFormat: function(row, column, cellValue) {
      let rtnVal = "";
      switch (cellValue) {
        case 0:
          rtnVal = "幣安";
        case 1:
          rtnVal = "OKEx";
        case 2:
          rtnVal = "Bitfinex";
        case "jac":
          rtnVal = "jac 交易所";
      }
      return rtnVal;
    }
  },
  computed: {
    //,
    // rooms() {
    //   let rooms = {}
    //   this.tableData.forEach(row => {
    //     row.rooms.forEach(room => {
    //       rooms[room.name] = 1
    //     })
    //   })
    //   return Object.keys(rooms)
    // }
  }
};
</script> 
<style scoped>
</style>


