<template>
  <div class="wrapper">
    <div class="projects">
      <project
        v-for="(p, i) in projects.data"
        :key="i"
        :title="p.title || 'Untitled'"
        :img="'https://via.placeholder.com/390x250?text='+p.title"
        :date="p.created_at | eurodate"
        :author="p.user.name"
        :uuid="p.uuid"
      />
    </div>
    <paginate
      :page-count="projects.last_page || 0"
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
import request from "@/request";

export default {
  name: "projects",
  props: ["user_id"],
  data() {
    return {
      projects: []
    };
  },
  components: {
    project: ProjectPreview
  },
  methods: {
    async getProjects(page) {
      let response = await request("api/projects/?page=" + page);
      this.projects = response;
    }
  },
  mounted() {
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
