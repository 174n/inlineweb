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

body {
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
  transition: 250ms;
}
.CodeMirror,
.CodeMirror-scroll {
  height: 100% !important;
}
.CodeMirror-overlayscroll-horizontal div,
.CodeMirror-overlayscroll-vertical div {
  background: #505050 !important;
}
.CodeMirror-scrollbar-filler {
  visibility: hidden;
}
</style>
