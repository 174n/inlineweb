<template>
  <div id="app">
  	<Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header";
require("typeface-montserrat");

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "normalize-scss";
@include normalize();

*,
*:before,
*:after {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}
</style>
