<template>
  <div class="container">
    <custom-form :inputs="inputs" button="Register" @submit="formSubmit" />
  </div>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "register",
  components: {
    "custom-form": Form
  },
  data() {
    return {
      inputs: [
        {
          name: "email",
          type: "email",
          model: ""
        },
        {
          name: "login",
          type: "text",
          model: ""
        },
        {
          name: "password",
          type: "password",
          model: ""
        },
        {
          name: "password2",
          placeholder: "Confirm password",
          type: "password",
          model: ""
        }
      ]
    };
  },
  methods: {
    formSubmit(inputs) {
      console.log(inputs);
    }
  }
};
</script>
