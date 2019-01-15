<template>
  <div id="app">
  	<Header/>
    <router-view/>
    <Error/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Error from "@/components/Error";
require("typeface-montserrat");

export default {
  components: {
    Header,
    Error
  },
  created() {
    if (this.$store.state.token) {
      this.$store.dispatch("getUser");
    }
  }
};
</script>

<style lang="scss">
@import "normalize-scss";
@include normalize();
</style>
