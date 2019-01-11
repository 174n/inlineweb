<template>
  <div class="container">
    <form @submit.prevent="formSubmit">
      <div class="form-item" v-for="input in inputs" :key="input.name">
        <label :for="input.name" :class="{warning: errors.has(input.name)}">
          {{ input.placeholder || input.name | capitalize }}
        </label>
        <input
          :type="input.type"
          :name="input.name"
          :ref="input.name"
          :placeholder="input.placeholder || input.name | capitalize"
          :class="{warning: errors.has(input.name)}"
          :data-vv-as="input.vvas"
          v-model="input.model"
          v-validate="input.validation"
        >
        <div class="error">{{ errors.first(input.name) }}</div>
      </div>
      <div class="form-item with-margin">
        <button type="submit" :disabled="errors.all().length > 0">
          {{ button }}
        </button>
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
  },
  methods: {
    formSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log(result);
          this.$emit("submit", this.inputs);
        }
      });
    }
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
    &.warning {
      color: $red;
    }
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
    &.warning {
      box-shadow: inset 0 -1px 0 3px $red;
    }
  }
  button {
    outline: none;
    border-radius: $borderRadius;
    display: block;
    background-color: $green;
    cursor: pointer;
    font-weight: 700;
    min-width: 50%;
    flex-grow: 1;
    &[disabled] {
      cursor: default;
      background-color: $grayText;
      color: lighten($lightGray, 30);
    }
  }
  a {
    margin-left: 15px;
    font-size: 0.9em;
    display: block;
    text-decoration: none;
    color: $grayText;
  }
}
.error {
  color: $red;
  font-size: 0.9em;
  margin-top: 10px;
}
</style>