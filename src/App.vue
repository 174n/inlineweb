<template>
  <div id="app">
  	<Header/>
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
</style>
