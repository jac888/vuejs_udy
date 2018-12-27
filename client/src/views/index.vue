<template>
    <div class="index">
        <header-nav/>
        <SideMenu/>
        <div class="rightContainer">
          <router-view/>
        </div>    
    </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav";
import SideMenu from "../components/SideNav";
export default {
  name: "index",
  components: {
    HeaderNav,
    SideMenu
  }
};
</script> 
<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0px;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

