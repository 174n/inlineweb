<template>
  <div class="container">
    <form @submit.prevent="$emit('submit', inputs)">
      <div class="form-item" v-for="input in inputs" :key="input.name">
        <label :for="input.name">
          {{ input.name | capitalize }}
        </label>
        <input
          :type="input.type"
          v-model="input.model"
          :name="input.name"
          :placeholder="input.placeholder || input.name | capitalize"
        >
      </div>
      <div class="form-item with-margin">
        <button type="submit">{{ button }}</button>
        <a href="#" v-if="link">{{ link.text }}</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  props: {
    inputs: Array,
    button: String,
    link: Object
  }
};
</script>

<style scoped lang="scss">
form {
  background-color: lighten($editorThemeBg, 10);
  width: 500px;
  margin: 30px auto;
  padding: 30px;
}
.form-item {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  &.with-margin {
    margin-top: 15px;
  }
  label {
    font-size: 0.8em;
    color: $grayText;
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }
  input,
  button {
    padding: 10px;
    border: 0;
    letter-spacing: 1px;
    font-size: 1.1em;
  }
  input {
    width: 100%;
  }
  button {
    outline: none;
    border-radius: $borderRadius;
    display: block;
    background-color: $green;
    font-weight: 700;
    min-width: 50%;
    flex-grow: 1;
  }
  a {
    margin-left: 15px;
    font-size: 0.9em;
    display: block;
    text-decoration: none;
    color: $grayText;
  }
}
</style>
