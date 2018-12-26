<template>
  <div id="editor">
    <div class="container">
      <div class="editor-panes" :style="editorPanesStyles">
        <div class="pane html-pane">
          <codemirror v-model="htmlCode" :options="getEditorParams('html')"></codemirror>
        </div>
        <div class="pane css-pane">
          <codemirror v-model="cssCode" :options="getEditorParams('css')"></codemirror>
        </div>
        <div class="pane js-pane">
          <codemirror v-model="jsCode" :options="getEditorParams('javascript')"></codemirror>
        </div>
        <div class="pane output-pane">
          <div class="resizer" @mousedown="startResizing"></div>
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
//theme
import "codemirror/theme/base16-dark.css";
//addons
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/simplescrollbars.css";

export default {
  data() {
    return {
      htmlCode: '<div class="css-pane"></div>',
      cssCode: ".test {\n\tcolor: red;\n}",
      jsCode: "const a = 10",
      editorPanesStyles: {
        "grid-template-columns": "40% 60%"
      },
      resizing: false
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
      line: true,
      scrollbarStyle: "overlay"
    }),
    startResizing() {
      this.resizing = true;
      let that = this;
      window.addEventListener("mouseup", () => {
        that.resizing = false;
      });
      window.addEventListener("mousemove", this.doResize);
    },
    doResize(e) {
      if (this.resizing) {
        let prop = "grid-template-columns";
        // let [left, right] = this.editorPanesStyles[prop]
        //   .split(/(\d{2})%/g)
        //   .filter(v=>v.trim())
        //   .map(v=>parseFloat(v));
        // eslint-disable-next-line
        this.editorPanesStyles[prop] = `${e.pageX + 2}px ${window.innerWidth - e.pageX - 2}px`;
        console.log(e.pageX, window.innerWidth);
      }
    }
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
  grid-template-rows: repeat(3, 1fr);
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
  padding-left: 10px;
  position: relative;
}
.resizer {
  display: block;
  height: 100%;
  width: 10px;
  position: absolute;
  left: 0;
  cursor: ew-resize;
  background-color: #151515;
  transition: all 0.1s ease-in-out;
  // &:hover {
  //   left: -7px;
  //   width: 9px;
  // }
  &:before {
    content: "";
    display: block;
    $resizer-border: #ccc 1px solid;
    border-right: $resizer-border;
    border-left: $resizer-border;
    width: 3px;
    height: 50px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
.pane {
  overflow: hidden;
  .vue-codemirror {
    height: 100%;
  }
}
</style>
