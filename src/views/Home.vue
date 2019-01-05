<template>
  <div class="container">
    <section class="home">
      <div class="projects">
        <project
          v-for="(p, i) in projects"
          :key="i"
          :title="p.title"
          :img="p.img"
          :date="p.date"
          :author="p.author"
        />
      </div>
      <div class="pagination"></div>
    </section>
  </div>
</template>

<script>
import ProjectPreview from "@/components/ProjectPreview";
import projects from "@/faker/projects.json";

export default {
  name: "home",
  data() {
    return {
      projects: projects.slice(0, 6)
    };
  },
  components: {
    project: ProjectPreview
  }
};
</script>

<style scoped lang="scss">
.projects {
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
</style>
