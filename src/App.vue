<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
require("typeface-montserrat");
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
