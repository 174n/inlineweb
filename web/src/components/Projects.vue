<template>
  <div class="wrapper">
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
    <paginate
      :page-count="pageCount"
      :click-handler="getProjects"
      :page-range="4"
      prev-text="Prev"
      next-text="Next"
      container-class="paginate"
    >
    </paginate>
  </div>
</template>

<script>
import ProjectPreview from "@/components/ProjectPreview";
import projects from "@/faker/projects.json";

export default {
  name: "projects",
  data() {
    return {
      projects: [],
      projectsPerPage: 6
    };
  },
  components: {
    project: ProjectPreview
  },
  computed: {
    pageCount() {
      return Math.ceil(projects.length / this.projectsPerPage);
    }
  },
  methods: {
    getProjects(page) {
      let start = (page - 1) * this.projectsPerPage;
      this.projects = projects.slice(start, start + this.projectsPerPage);
    }
  },
  created() {
    this.getProjects(1);
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
