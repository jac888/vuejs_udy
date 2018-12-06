<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    盈幣電子交易平台
                </span>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="100px" class="registerForm ">
                    <el-form-item label="用戶名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="請輸入用戶名"></el-input>
                    </el-form-item>
                    <el-form-item label="電子郵件" prop="email">
                        <el-input v-model="registerUser.email" placeholder="請輸入電子郵件地址"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="請輸入密碼"></el-input>
                    </el-form-item>
                    <el-form-item label="確認密碼" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="請確認密碼"></el-input>
                    </el-form-item>
                    <el-form-item label="選擇身份">
                        <el-select v-model="registerUser.indentity" placeholder="請選擇身分">
                            <el-option label="管理員" value="manager"/>
                            <el-option label="使用者" value="user"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="sumbit_btn " @click="submitForm('registerForm')">註冊</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data() {
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      }
    };
  }
};
</script> 
<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/background.jpg);
  background-repeat: no-repeat;
  background-position: center center;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  color: black;
}

.form-container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 36px;
  color: white;
}

.registerForm {
  margin-top: 20px;
  background-color: white;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>   


