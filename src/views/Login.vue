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
        }
      ],
      link: {
        text: "Forgot password?"
      }
    };
  },
  methods: {
    formSubmit(inputs) {
      inputs.forEach(v => {
        console.log(v.model);
        v.model = "";
      });
    }
  }
};
</script>
