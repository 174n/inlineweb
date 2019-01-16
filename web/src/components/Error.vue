<template>
  <div class="error-msg" :class="color" v-if="visible">
    <span class="brief">{{ brief }}: </span>
    <span class="message">{{ message }}</span>
    <div class="close" @click="visible=false"></div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  name: "error",
  data() {
    return {
      visible: true,
      brief: "",
      message: "",
      color: ""
    };
  },
  created() {
    EventBus.$on(
      "error",
      (brief = "Error", message = "Undefined error occurred") => {
        this.brief = brief;
        this.message = message;
        this.visible = true;
        this.color = "red";
        let self = this;
        setTimeout(function() {
          self.visible = false;
        }, 7000);
      }
    );
    EventBus.$on(
      "success",
      (brief = "Success", message = "Action is successfully completed") => {
        this.brief = brief;
        this.message = message;
        this.visible = true;
        this.color = "green";
        let self = this;
        setTimeout(function() {
          self.visible = false;
        }, 7000);
      }
    );
  }
};
</script>

<style scoped lang="scss">
.error-msg {
  position: absolute;
  z-index: 99999999999;
  margin: 15px;
  padding: 15px;
  color: $editorThemeBg;
  bottom: 0;
  animation: slide-top 1s cubic-bezier(0, 0.57, 0, 1) both;
  transform: translateX(-100vw);
  padding-right: 60px;
  min-height: 50px;
  &.red {
    background-color: $red;
    .close {
      background-color: darken($red, 5);
    }
  }
  &.green {
    background-color: $green;
    .close {
      background-color: darken($green, 5);
    }
  }
  &.yellow {
    background-color: $yellow;
    .close {
      background-color: darken($yellow, 5);
    }
  }
  .brief {
    font-size: 1.2em;
    font-weight: 600;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    opacity: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      content: " ";
      height: 33px;
      width: 2px;
      background-color: lighten($editorThemeBg, 10);
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}

@keyframes slide-top {
  0% {
    transform: translateX(-1000vw);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
