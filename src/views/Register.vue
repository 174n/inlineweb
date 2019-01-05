<template>
  <div class="container">
    <form id="login" @submit.prevent="formSubmit">
      <div class="form-item">
        <label for="email">E-mail</label>
        <input type="text" v-model="email" name="email" placeholder="E-mail">
      </div>
      <div class="form-item">
        <label for="login">Login</label>
        <input type="text" v-model="login" name="login" placeholder="Login">
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password" placeholder="Password">
      </div>
      <div class="form-item">
        <label for="password2">Confirm password</label>
        <input type="password" v-model="password2" name="password2" placeholder="Confirm password">
      </div>
      <div class="form-item with-margin">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      login: "",
      password: "",
      password2: ""
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
