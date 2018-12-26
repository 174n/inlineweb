<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "normalize-scss";
@include normalize();

.CodeMirror {
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
