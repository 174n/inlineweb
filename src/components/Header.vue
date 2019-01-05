<template>
  <header id="header">
  	<div class="left">
      <router-link to="/" class="logo">logo</router-link>
    </div>
    <div class="right">
      <div class="authorized" v-if="authed">
        <button class="profile">
          <div class="avatar"></div>
          <div class="text">Nickname</div>
        </button>
        <div class="submenu">
          <div class="item">test 1</div>
          <div class="item">test 2</div>
          <div class="item">test 3</div>
          <div class="item">test 4</div>
          <div class="item">test 5</div>
        </div>
      </div>
      <div class="unauthorized" v-else>
        <router-link to="login" class="btn">Log In</router-link>
        <router-link to="register" class="btn focus">Register</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      authed: false
    };
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
  &.focus {
    background-color: $green;
    color: $editorThemeBg;
    &:hover {
      background-color: lighten($green, 10);
    }
  }
  &:hover {
    background-color: lighten($btnColor, 10);
  }
}
.profile {
  display: flex;
  align-items: center;
  // background-color: $btnColor;
  background-color: transparent;
  // border-radius: 10px;
  border: 0;
  color: inherit;
  cursor: pointer;
  height: $sidebarHeight;
  .avatar {
    height: 35px;
    width: 35px;
    border-radius: 10px;
    background-color: #666;
  }
  .text {
    margin: 0 5px 0 10px;
  }
  &:hover ~ .submenu {
    visibility: visible;
  }
}
.submenu {
  position: absolute;
  z-index: 100;
  top: $sidebarHeight;
  right: 0;
  width: 200px;
  visibility: hidden;
  background-color: lighten($editorThemeBg, 10);
  .item {
    padding: 15px 20px;
    &:hover {
      background-color: lighten($editorThemeBg, 20);
    }
  }
  &:hover {
    visibility: visible;
  }
}
</style>
