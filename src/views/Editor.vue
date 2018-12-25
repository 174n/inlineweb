<template>
  <div id="editor">
    <div class="container">
      <div class="editor-panes">
        <div class="pane html-pane">
          <!-- <div class="title">html</div> -->
          <div class="content">
            <codemirror v-model="htmlCode" :options="getEditorParams('html')"></codemirror>
          </div>
        </div>
        <div class="pane css-pane">
          <!-- <div class="title">css</div> -->
          <div class="content">
            <codemirror v-model="cssCode" :options="getEditorParams('css')"></codemirror>
          </div>
        </div>
        <div class="pane js-pane">
          <!-- <div class="title">js</div> -->
          <div class="content">
            <codemirror v-model="jsCode" :options="getEditorParams('javascript')"></codemirror>
          </div>
        </div>
        <div class="pane output-pane">
          hello there
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";

export default {
  data() {
    return {
      htmlCode: '<div class="css-pane"></div>',
      cssCode: ".test {\n\tcolor: red;\n}",
      jsCode: "const a = 10"
    };
  },
  components: {
    codemirror
  },
  methods: {
    getEditorParams: lang => ({
      tabSize: 4,
      mode: `text/${lang}`,
      theme: "base16-dark",
      lineNumbers: true,
      line: true
    })
  }
};
</script>

<style scoped lang="scss">
$sidebarHeight: 60px;
.editor-panes {
  position: absolute;
  display: grid;
  margin-top: $sidebarHeight;
  height: calc(100% - #{$sidebarHeight});
  width: 100%;
  grid-template-rows: repeat(3, 33.33%);
  grid-template-columns: 40% 60%;
  grid-template-areas:
    "html output"
    "css output"
    "js output";
}
.html-pane {
  grid-area: html;
}
.css-pane {
  grid-area: css;
}
.js-pane {
  grid-area: js;
}
.output-pane {
  grid-area: output;
}
.pane {
  .content, .vue-codemirror{
    height: 100%;
  }
}
</style>
