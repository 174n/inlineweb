<template>
  <div class="wrapper" v-if="visible" @click="close">
    <div class="modal">
      <div class="title">
        <div class="text">
          {{ title }}
        </div>
        <div class="close"></div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: ["title"],
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close(e) {
      if (e.target.className === "wrapper" || e.target.className === "close") {
        this.visible = false;
      }
    },
    open() {
      this.visible = true;
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  color: $grayText;
}
.modal {
  background-color: lighten($lightGray, 5);
  max-width: 600px;
  .title {
    position: relative;
    background-color: lighten($editorThemeBg, 5);
    padding: 10px 15px;
    height: 40px;
    padding-right: 50px;
    .close {
      @include close(
        40px,
        lighten($editorThemeBg, 30),
        lighten($editorThemeBg, 2),
        0.5
      );
    }
  }
  .content {
    padding: 15px;
  }
}
</style>
