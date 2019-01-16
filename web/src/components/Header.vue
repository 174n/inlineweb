<template>
  <header id="header">
  	<div class="left">
      <router-link to="/" class="logo">logo</router-link>
    </div>
    <div class="right">
      <div v-if="user">
        <router-link class="btn new" to="/editor" v-if="route !== 'editor'">
          New Project
        </router-link>
        <a class="btn new" to="/editor" v-else>
          Save
        </a>
        <router-link class="profile" to="/user">
          <span class="avatar" v-html="avatar"></span>
          <div class="text">{{ user.name }}</div>
        </router-link>
      </div>
      <div v-else>
        <router-link to="login" class="btn">Log In</router-link>
        <router-link to="register" class="btn focus">Register</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import jdenticon from "jdenticon";

export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    avatar() {
      return jdenticon.toSvg(this.user.name, 35);
    },
    route() {
      return this.$route.name;
    }
  },
  mounted() {
    console.log(this.route);
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
  padding: 0 15px;
}
.logo {
  text-decoration: none;
  color: inherit;
  padding: 15px 0;
}
.right > div {
  display: flex;
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
