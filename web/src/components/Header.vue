<template>
  <header id="header">
  	<div class="left">
      <router-link to="/" class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet"><path fill="#2e8c84" d="M100 16L100 58L79 58ZM142 58L100 58L100 37ZM100 184L100 142L121 142ZM58 142L100 142L100 163ZM58 58L58 100L37 100ZM184 100L142 100L142 79ZM142 142L142 100L163 100ZM16 100L58 100L58 121Z"></path><path fill="#59c7be" d="M100 58L100 91L79 58ZM142 100L109 100L142 79ZM100 142L100 109L121 142ZM58 100L91 100L58 121Z"></path></svg>
      </router-link>
      <div class="editorTitle" v-if="!notInEditor">
        <input type="text" v-model="editorTitle" @keyup="editorChanges=true">
      </div>
    </div>
    <div class="right">
      <div v-if="user">
        <router-link class="btn new" to="/editor" v-if="notInEditor">
          New Project
        </router-link>
        <button
          class="btn new"
          :class="{focus: editorChanges}"
          @click="saveProject"
          to="/editor"
          v-else v-show="!editorAuthor || editorAuthor === user.name">
          Save
        </button>
        <router-link class="profile" to="/user">
          <span class="avatar" v-html="avatar"></span>
          <div class="text">{{ user.name }}</div>
        </router-link>
      </div>
      <div v-else>
        <router-link to="/login" class="btn">Log In</router-link>
        <router-link to="/register" class="btn focus">Register</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import jdenticon from "jdenticon";
import { EventBus } from "@/event-bus.js";

export default {
  data() {
    return {
      editorChanges: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    avatar() {
      return jdenticon.toSvg(this.user.name, 35);
    },
    route() {
      return this.$route.name;
    },
    notInEditor() {
      return this.route !== "editor";
    },
    editorTitle: {
      get() {
        return this.$store.state.editorTitle;
      },
      set(value) {
        this.$store.commit("updateEditorTitle", value);
      }
    },
    editorAuthor() {
      return this.$store.state.editorAuthor;
    }
  },
  methods: {
    writeEditorChanges(state) {
      this.editorChanges = state;
    },
    saveProject() {
      EventBus.$emit("save-project");
    }
  },
  mounted() {
    EventBus.$on("editor-new-change", this.writeEditorChanges);
  },
  beforeDestroy() {
    EventBus.$off("editor-new-change", this.writeEditorChanges);
  }
};
</script>

<style scoped lang="scss">
$btnColor: #333;

#header {
  // position: fixed;
  height: $sidebarHeight;
  width: 100%;
  background-color: $editorThemeBg;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  text-decoration: none;
  color: inherit;
  padding: 5px 10px;
  background-color: lighten($editorThemeBg, 5);
}
.editorTitle {
  margin: 13px;
  input {
    padding: 5px;
    font-size: 1.2em;
    border: 0;
    background-color: transparent;
    color: $grayText;
    border-bottom: 1px $grayText solid;
    outline: none;
  }
}
.left,
.right > div {
  display: flex;
  align-items: center;
}
.right {
  padding-right: 15px;
}
.btn {
  text-decoration: none;
  color: inherit;
  background-color: $btnColor;
  padding: 10px 20px;
  margin-left: 15px;
  border-radius: $borderRadius;
  transition: 250ms;
  letter-spacing: 1px;
  font-weight: 600;
  display: block;
  border: 0;
  cursor: pointer;
  outline: none;
  &.focus {
    background-color: $green;
    color: $editorThemeBg;
    &:hover {
      background-color: lighten($green, 10);
    }
  }
  &.new {
    margin: 12px;
  }
  &:hover {
    background-color: lighten($btnColor, 10);
  }
}
.profile {
  display: flex;
  align-items: center;
  border: 0;
  color: inherit;
  cursor: pointer;
  height: $sidebarHeight;
  margin-left: 15px;
  text-decoration: none;
  .avatar {
    height: 35px;
    width: 35px;
    border-radius: 10px;
    background-color: #666;
  }
  .text {
    margin: 0 5px 0 10px;
    text-transform: capitalize;
  }
}
</style>
