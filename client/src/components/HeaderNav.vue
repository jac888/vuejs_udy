<template>
   <header class="header-nav">
       <el-row>
           <!-- 左方logo -->
           <el-col :span="6" class="logo-container" >
                <img src="../assets/logo.png" style="padding-top:5px;" width="10%" height="10%" class="logo" alt="">
                <span class="title" style="padding-top:20px;" >  盈幣下單系統 </span>
           </el-col >
           <!-- 右方使用者 -->
           <el-col :span="6" class="user">
               <!-- avatar -->
                <div class="userinfo">
                    <img :src="user.avatar" alt="" class="avatar">           
                <div class="welcome">
                    <p class="name comename">歡迎</p>
                    <p class="avatarname">{{user.name}}</p>
                </div>
                <!-- 下拉選單 -->
                <span class="username" >
                     <el-dropdown trigger="click" @command="setDialogInfo">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="info">個人資料</el-dropdown-item>
                            <el-dropdown-item command="logout" >登出</el-dropdown-item>
                           
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                 </div>
           </el-col>
       </el-row>
   </header>
</template>

<script>
export default {
  name: "header-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      //console.log(cmdItem);
      if (cmdItem === "info") this.showInfoList();
      if (cmdItem === "logout") this.logOut();
    },
    showInfoList() {},
    logOut() {
      //delete token
      localStorage.removeItem("accessToken");
      //remove store data
      this.$store.dispatch("loggedOut");
      //redirect to login page
      this.$router.push("/login");
    }
  }
};
</script> 

<style scoped>
.header-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #ffffff;
  color: rgb(1, 3, 1);
  border-bottom: 1px solid #ffffff;
}
.title {
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: bottom;
  padding: 0 2px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 10px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #000;
}
</style>


