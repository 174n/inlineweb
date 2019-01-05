<template>
  <a href="#" class="project" :style="projectBg">
    <div class="text">
      <div class="top">{{ title | truncate(34) }}</div>
      <div class="bottom">{{ author }} &bull; <span class="date">{{ date }}</span></div>
    </div>
  </a>
</template>

<script>
export default {
  name: "project",
  props: ["img", "title", "date", "author"],
  computed: {
    projectBg() {
      return {
        backgroundImage: `url('${this.img}')`
      };
    }
  }
};
</script>

<style scoped lang="scss">
.project {
  display: block;
  position: relative;
  height: 250px;
  background-size: cover;
  text-decoration: none;
  color: #ccc;
  &:hover {
    .text {
      padding: 20px 10px;
    }
  }
}
.text {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 300ms;
  padding: 10px;
  .top {
    font-weight: 700;
    font-size: 1.1em;
    letter-spacing: 1px;
    text-transform: capitalize;
  }
  .bottom {
    font-size: 0.9em;
    color: #bbb;
  }
  .date {
    font-size: 0.9em;
  }
}
</style>
