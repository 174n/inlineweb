<template>
  <div class="container">
    <div class="user" v-if="user">
      <div class="avatar" v-html="avatar"></div>
      <div class="text">
        <div class="username">
          {{ user.name }}
        </div>
        <div class="created">
          Registration date: {{ this.user.created_at | eurodate }}
        </div>
        <div class="projects">This user has {{ total }} project{{ multipleLetter }}</div>
      </div>
      <a @click="logout" v-if="!userId" class="logout">Logout</a>
    </div>
    <projects :userid="user.id" @total="getTotal"/>
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
  data() {
    return {
      total: 0
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userId() {
      return this.$route.params.id;
    },
    avatar() {
      return jdenticon.toSvg(this.user.name, 200);
    },
    multipleLetter() {
      return this.total > 1 ? "s" : "";
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
    },
    getTotal(total) {
      this.total = total;
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

  @include mq($until: tablet) {
    width: 100%;
    align-items: center;
    flex-direction: column;
    border-radius: 0;
    .text {
      font-size: 0.8em;
      margin: 10px;
    }
  }
}
.avatar {
  width: 200px;
  height: 200px;
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
  display: none;
}
</style>
