<template>
  <div class="container">
    <custom-form :inputs="inputs" button="Log In" :link="link" @submit="formSubmit" />
  </div>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "login",
  components: {
    "custom-form": Form
  },
  data() {
    return {
      inputs: [
        {
          name: "email",
          type: "text",
          validation: "required|email",
          model: ""
        },
        {
          name: "password",
          type: "password",
          validation: "required|min:6|max:25",
          model: ""
        }
      ],
      link: {
        text: "Forgot password?"
      },
      error: "test"
    };
  },
  methods: {
    async formSubmit(inputs) {
      let fields = {};
      inputs.forEach(v => {
        fields[v.name] = v.model;
        v.model = "";
      });
      this.$store.dispatch("login", {
        email: fields.email,
        password: fields.password
      });
    }
  }
};
</script>
