<template>
    <div class="login" >
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    交易平台登入
                </span>
                <el-form :model="loginUser" :rules="rules" ref="loginUser" label-width="80px" class="loginForm">
                    <el-form-item label="電子郵件" prop="email">
                        <el-input v-model="loginUser.email" placeholder="請輸入電子郵件地址"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="請輸入密碼"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="sumbit_btn" @click="submitForm('loginUser')">登入</el-button>
                    </el-form-item>
                    <div class="tipArea">
                        <p>還沒有帳號？ 立即<router-link to='/register'>註冊</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "電子郵件地址不正確",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密碼不能為空",
            trigger: "blur"
          },
          {
            min: 8,
            max: 10,
            message: "密碼長度為8個英數字至10個之間",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            //login
            .post("/api/user/login", this.loginUser)
            .then(res => {
              console.log(res.data);
              //login success
              //get token
              const { token } = res.data;
              //save to localStorage
              localStorage.setItem("accessToken", token);
              //localStorage.setItem("accessToken") = token;
              //解析token
              const decoded = jwt_decode(token);
              //console.log(decoded);
              //save token to vuex
              this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
              this.$store.dispatch("setUser", decoded);
              this.$router.push("/index");
            })
            .catch(error => {
              //console.log("errldh: " + error.response.status);
              //   if (error.response.status === 400) {
              //     this.$message({
              //       message: "電子郵件！",
              //       type: "fail"
              //     });
              //   }
            });
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script> 
<style scoped>
.login {
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

.loginForm {
  margin-top: 20px;
  background-color: white;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

.tipArea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tipArea p a {
  color: #b817d8;
}
</style>   


