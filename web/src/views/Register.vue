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
          validation: "required|email",
          model: ""
        },
        {
          name: "login",
          type: "text",
          validation: "required|alpha_dash|min:3|max:15",
          model: ""
        },
        {
          name: "password",
          type: "password",
          validation: "required|min:6|max:25",
          model: ""
        },
        {
          name: "password2",
          placeholder: "Confirm password",
          type: "password",
          validation: "required|confirmed:password",
          vvas: "password",
          model: ""
        }
      ]
    };
  },
  methods: {
    formSubmit(inputs) {
      let fields = {};
      inputs.forEach(v => {
        fields[v.name] = v.model;
        v.model = "";
      });
      this.$store.dispatch("register", {
        email: fields.email,
        name: fields.login,
        password: fields.password
      });
    }
  }
};
</script>
