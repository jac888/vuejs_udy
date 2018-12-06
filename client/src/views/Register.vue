<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    盈幣電子交易平台
                </span>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "register",
  components: {}
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
</style>   


