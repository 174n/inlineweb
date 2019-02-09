<template>
  <div id="app" :class="{forfooter: displayfooter}">
    <Header/>
    <router-view/>
  	<Footer/>
    <Message/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Message from "@/components/Message";
require("typeface-montserrat");

export default {
  components: {
    Header,
    Footer,
    Message
  },
  created() {
    if (this.$store.state.token) {
      this.$store.dispatch("getUser");
    }
  },
  data() {
    return {
      displayfooter: true
    };
  },
  watch: {
    $route() {
      this.displayfooter = !/^\/editor/g.test(this.$router.currentRoute.path);
    }
  }
};
</script>

<style lang="scss">
@import "normalize-scss";
@include normalize();

.forfooter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}
</style>
