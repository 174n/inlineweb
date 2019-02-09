<template>
  <footer id="footer" v-if="displayfooter">
    Made with <img :src="require(`@/assets/vue.svg`)"> by <a href="https://alexandrov.online" target="_blank">Ivan Alexandrov</a>
  </footer>
</template>

<script>
export default {
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

<style scoped lang="scss">
footer {
  display: flex;
  background-color: #333;
  height: 70px;
  padding: 20px;
  margin-top: 100px;
  color: $grayText;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  letter-spacing: 0.07em;
  font-size: 0.8em;
}
img {
  width: 2em;
  height: 2em;
  margin: 0 0.05em;
}
a {
  margin-left: 0.3em;
  color: $grayText;
  font-weight: bold;
  text-decoration: none;
  transition: all 300ms ease-in-out;
  &:hover {
    color: $green;
  }
}
</style>
