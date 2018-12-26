<template>
  <div id="editor">
    <div class="container">
      <div class="editor-panes" :style="editorPanesStyles">
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
      window.addEventListener("mouseup", e => {
        that.resizing = false;
      });
      window.addEventListener("mousemove", this.doResize);
    },
    doResize(e) {
      if(this.resizing){
        let prop = "grid-template-columns";
        // let [left, right] = this.editorPanesStyles[prop]
        //   .split(/(\d{2})%/g)
        //   .filter(v=>v.trim())
        //   .map(v=>parseFloat(v));
        this.editorPanesStyles[prop] = `${e.pageX+2}px ${window.innerWidth-e.pageX-2}px`;
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
  // grid-template-columns: 40% 60%;
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
  padding-left: 5px;
  position: relative;
}
.resizer{
  display: block;
  height: 100%;
  width: 5px;
  background-color: #999;
  position: absolute;
  left: -5px;
  cursor: ew-resize;
  transition: all .1s ease-in-out;
  &:hover{
    left: -7px;
    width: 9px;
  }
}
.pane {
  .content,
  .vue-codemirror {
    height: 100%;
  }
}
</style>
