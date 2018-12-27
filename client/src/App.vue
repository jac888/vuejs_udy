<template>
  <div id="app">
    <router-view/>
  </div>
</template>

//refresh後會清除掉所有的信息，所以必須添加在app.vue裡

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  components: {},
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  created() {
    if (localStorage.accessToken) {
      const decoded = jwt_decode(localStorage.accessToken);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  }
};
</script> 

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
