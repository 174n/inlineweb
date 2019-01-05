<template>
  <div class="container">
    <form id="login" @submit.prevent="formSubmit">
      <div class="form-item">
        <label for="login">Login</label>
        <input type="text" v-model="login" name="login" placeholder="Login">
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password" placeholder="Password">
      </div>
      <div class="form-item with-margin">
        <button type="submit">Log In</button>
        <a href="#">Forgot password?</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    formSubmit() {
      console.log(this.login, this.password);
      this.login = this.password = "";
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  background-color: lighten($editorThemeBg, 10);
  width: 500px;
  margin: 30px auto;
  padding: 30px;
}
</style>
