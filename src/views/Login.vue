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
          model: ""
        },
        {
          name: "password",
          type: "password",
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
