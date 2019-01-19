<template>
  <div id="app">
  	<Header/>
    <router-view/>
    <Message/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Message from "@/components/Message";
require("typeface-montserrat");

export default {
  components: {
    Header,
    Message
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
