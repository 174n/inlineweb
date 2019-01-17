<template>
  <router-link tag="a" class="project" :to="projectUrl">
    <div class="text">
      <div class="top">{{ title | truncate(34) }}</div>
      <div class="bottom">{{ author }} &bull; <span class="date">{{ date }}</span></div>
    </div>
    <div class="thumbnail-container">
      <div class="thumbnail">
       <iframe :src="'/p/' + uuid" frameborder="0"></iframe>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "project",
  props: ["img", "title", "date", "author", "uuid"],
  computed: {
    projectBg() {
      return {
        backgroundImage: `url('${this.img}')`
      };
    },
    projectUrl() {
      return `/editor/${this.uuid}`;
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
  background-position: center center;
  text-decoration: none;
  background-color: #fff;
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
  z-index: 50;
  .top {
    font-weight: 700;
    font-size: 1.1em;
    letter-spacing: 1px;
    text-transform: capitalize;
  }
  .bottom {
    margin-top: 2px;
    font-size: 0.9em;
    color: #bbb;
  }
  .date {
    font-size: 0.9em;
  }
}

.thumbnail-container {
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  .thumbnail {
    iframe {
      width: 1366px;
      height: 1000px;
    }
    position: relative;
    transform: scale(0.25);
    transform-origin: 0 0;
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      width: 400%;
      height: 100%;
    }
  }
}
</style>
