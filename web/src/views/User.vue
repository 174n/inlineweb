<template>
  <div class="container">
    <div class="user" v-if="user">
      <div class="avatar" v-html="avatar"></div>
      <div class="text">
        <div class="username">
          {{ user.name }}
        </div>
        <div class="created"> Registration date: {{ userCreated }}</div>
        <div class="projects">This user has 1 project</div>
      </div>
      <a @click="logout" v-if="!userId" class="logout">Logout</a>
    </div>
    <projects/>
  </div>
</template>

<script>
import Projects from "@/components/Projects";
import jdenticon from "jdenticon";

export default {
  name: "user",
  components: {
    Projects
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userId() {
      return this.$route.params.id;
    },
    avatar() {
      return jdenticon.toSvg(this.user, 200);
    },
    userCreated() {
      return this.user.created_at
        .split(" ")[0]
        .split("-")
        .reverse()
        .join(".");
    }
  },
  mounted() {
    if (!this.user && !this.userId) {
      this.route.push("/");
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  background-color: $editorThemeBg;
  border-radius: $borderRadius;
  margin-top: 15px;
  display: flex;
  padding: 15px;
  width: 60%;
  margin: 25px auto;
  position: relative;
}
.avatar {
  border-radius: $borderRadius;
  background-color: #666;
}
.text {
  flex-grow: 1;
  margin: 25px;
  color: $grayText;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .username {
    text-transform: capitalize;
    font-size: 2em;
    font-weight: 600;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
  }
  .created {
    font-size: 0.8em;
    letter-spacing: 0.07em;
    margin-top: 10px;
    color: darken($grayText, 30);
  }
  .projects {
    margin-top: 10px;
    letter-spacing: 0.07em;
  }
}
.logout {
  position: absolute;
  top: 10px;
  right: 10px;
  margin-left: 10px;
  font-size: 0.9em;
  font-weight: 600;
  background-color: $green;
  color: $editorThemeBg;
  letter-spacing: 0.05em;
  padding: 5px 10px;
  border-radius: $borderRadius;
  text-decoration: none;
  cursor: pointer;
}
</style>
