<template>
  <div class="wrapper">
    <section class="hero" :style="`background-image: url(${require(`@/assets/hero.svg`)});`">
      <div class="container">
        <div class="header">
          <h1>Inline Web</h1>
        </div>
        <div class="text">
          <p>It's like a normal <strong>frontend playground</strong>, but for <a href="https://github.com/alcor/itty-bitty/" target="_blank">itty.bitty</a>-like web apps. Your apps don't need to be saved on a server, because all the content will be encoded in the url. <strong>URLs up to 4000 bytes</strong> can be saved on your account and accessed through short aliases.</p>
          <p>Compared to <a href="https://github.com/alcor/itty-bitty/" target="_blank">itty.bitty</a> you can use <strong>secure local storage</strong> through custom functions. Each project's storage is encapsulated and can't be accessed from other projects.</p>
        </div>
        <div class="buttons">
          <router-link to="/register" class="accent" v-if="!$store.state.user">Register</router-link>
          <router-link to="/editor" class="accent" v-else>
            New Project
          </router-link>
          <a href="https://github.com/Rundik/inlineweb" target="_blank">
            Source Code
          </a>
        </div>
      </div>
    </section>
    <div class="container">
      <section id="home">
        <projects/>
      </section>
    </div>
  </div>
</template>

<script>
import Projects from "@/components/Projects";

export default {
  name: "home",
  components: {
    Projects
  }
};
</script>

<style scoped lang="scss">
.hero {
  .container {
    max-width: 700px;
    background-color: $editorThemeBg;
    border-radius: $borderRadius;
    padding: 50px;
    .header {
      margin-bottom: 25px;
    }
    h1 {
      font-size: 3em;
      letter-spacing: 0.07em;
      font-weight: 800;
      margin: 0;
      border-bottom: 5px $green solid;
      display: inline;
    }
    .text {
      letter-spacing: 0.05em;
      line-height: 1.4em;
    }
    .buttons {
      display: flex;
      margin-top: 20px;
      justify-content: center;
      a {
        display: block;
        text-decoration: none;
        background-color: $grayText;
        color: $editorThemeBg;
        padding: 10px 20px;
        margin-right: 20px;
        font-size: 1.2em;
        border-radius: $borderRadius;
        font-weight: 600;
        &:hover {
          background-color: lighten($grayText, 10);
        }
        &.accent {
          background-color: $green;
          &:hover {
            background-color: lighten($green, 10);
          }
        }
      }
    }
    @include mq($until: tablet) {
      padding: 15px;
      margin: 0 auto;
      width: 100%;
      .header {
        text-align: center;
      }
      h1 {
        font-size: 2em;
      }
      .buttons {
        flex-direction: column;
        a {
          margin: 0;
          font-size: 1em;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
  background-color: #333333;
  color: $grayText;
  padding: 50px 60px;
  @include mq($until: tablet) {
    padding: 15px;
  }
}
</style>
