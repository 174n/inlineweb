<template>
  <div id="editor">
    <div class="editor-panes" :class="panesPosition" :style="editorPanesStyles">
      <div class="pane html-pane">
        <div class="label">html</div>
        <codemirror
          v-model="htmlCode"
          @changes="editorChanges"
          :options="getEditorParams('html')"
        ></codemirror>
      </div>
      <div class="pane css-pane">
        <div class="label">css</div>
        <codemirror
          v-model="cssCode"
          @changes="editorChanges"
          :options="getEditorParams('css')"
        ></codemirror>
      </div>
      <div class="pane js-pane">
        <div class="label">js</div>
        <codemirror
          v-model="jsCode"
          @changes="editorChanges"
          :options="getEditorParams('javascript')"
        ></codemirror>
      </div>
      <div class="pane output-pane">
        <div class="resizer" :class="{ resizing }" @mousedown="startResizing"></div>
        <div class="overlay" :class="{ resizing }"></div>
        <iframe
          id="iframe"
          sandbox="allow-scripts allow-forms allow-top-navigation allow-popups allow-modals allow-popups-to-escape-sandbox"
          src="data:text/html;charset=utf-8;base64,aGVsbG8gdGhlcmU="
        ></iframe>
      </div>
      <div class="statusbar">
        <div class="left">testing</div>
        <div class="right">
          <button class="changePos" @click="panesPosition='left'">left</button>
          <button class="changePos" @click="panesPosition='right'">right</button>
          <button class="changePos" @click="panesPosition='top'">top</button>
          <button class="changePos" @click="panesPosition='bottom'">bottom</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
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
import emmet from "@emmetio/codemirror-plugin";

export default {
  name: "editor",
  data() {
    return {
      htmlCode: '<div class="css-pane"></div>',
      cssCode: ".test {\n\tcolor: red;\n}",
      jsCode: "const a = 10",
      editorPanesStyles: {
        "grid-template-columns": "",
        "grid-template-rows": ""
      },
      resizing: false,
      panesPosition: "left",
      changeTimer: null
    };
  },
  created() {
    emmet(CodeMirror);
  },
  components: {
    codemirror
  },
  watch: {
    panesPosition: function() {
      this.editorPanesStyles = {
        "grid-template-columns": "",
        "grid-template-rows": ""
      };
    }
  },
  methods: {
    getEditorParams: lang => ({
      tabSize: 4,
      mode: `text/${lang}`,
      theme: "base16-dark",
      lineNumbers: true,
      line: true,
      scrollbarStyle: "overlay",
      extraKeys: {
        Tab: "emmetExpandAbbreviation",
        Enter: "emmetInsertLineBreak"
      }
    }),
    startResizing() {
      this.resizing = true;
      let that = this;
      document.body.style.userSelect = "none";
      window.addEventListener("mouseup", () => {
        that.resizing = false;
        document.body.style.userSelect = "auto";
      });
      window.addEventListener("mousemove", this.doResize);
    },
    doResize(e) {
      if (this.resizing) {
        if (this.panesPosition === "left" || this.panesPosition === "right") {
          let prop = "grid-template-columns";
          if (window.innerWidth - e.pageX > 100 && e.pageX > 100) {
            this.editorPanesStyles[prop] =
              // eslint-disable-next-line
              `${e.pageX + 2}px ${window.innerWidth - e.pageX - 2}px`;
          }
        } else {
          let prop = "grid-template-rows";
          if (window.innerHeight - e.pageY > 100 && e.pageY > 100) {
            this.editorPanesStyles[prop] =
              // eslint-disable-next-line
              `${e.pageY + 2 - 90}px ${window.innerHeight - e.pageY - 2}px 30px`;
          }
        }
      }
    },
    editorChanges() {
      clearTimeout(this.changeTimer);
      this.changeTimer = setTimeout(() => {
        // eslint-disable-next-line
        let code = `<style>${this.cssCode}</style>${this.htmlCode}<script>${this.jsCode}<\/script>`;
        document.getElementById("iframe").src = `data:text/html;charset=utf-8;base64,${btoa(code)}`;
      }, 2000);
    }
  }
};
</script>

<style scoped lang="scss">
$sidebarHeight: 60px;
$editorThemeBg: #151515;
$lightGray: #2d2d2d;
$grayText: #ccc;

/deep/ {
  .CodeMirror {
    height: 100% !important;
  }
  .CodeMirror-scroll {
    font-size: 0.97em;
    height: calc(100% - 30px);
  }
  .CodeMirror-gutters {
    background-color: rgba(#fff, 0.03);
  }
  .CodeMirror-overlayscroll-horizontal div,
  .CodeMirror-overlayscroll-vertical div {
    background: #505050 !important;
  }
  .CodeMirror-scrollbar-filler {
    visibility: hidden;
  }
}

.editor-panes {
  $resizer-border: $grayText 1px solid;

  position: absolute;
  display: grid;
  margin-top: $sidebarHeight;
  height: calc(100% - #{$sidebarHeight});
  width: 100%;
  background-color: $editorThemeBg;

  .resizer {
    display: block;
    position: absolute;
    background-color: $editorThemeBg;
    transition: all 250ms ease-in-out;
    &:before {
      content: "";
      transition: 250ms;
      display: block;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  &.left,
  &.right {
    grid-template-rows: repeat(3, 1fr) 30px;
    .resizer {
      height: 100%;
      width: 10px;
      cursor: col-resize;
      &:hover,
      &.resizing {
        &:before {
          border-color: #eee;
          height: 60px;
        }
      }
      &:before {
        border-right: $resizer-border;
        border-left: $resizer-border;
        width: 5px;
        height: 50px;
      }
    }
  }
  &.left {
    grid-template-columns: 40% 60%;
    grid-template-areas:
      "html output"
      "css output"
      "js output"
      "statusbar statusbar";
    .resizer {
      left: 0;
      &:before {
        left: -3px;
      }
    }
    .output-pane {
      padding-left: 10px;
    }
  }
  &.right {
    grid-template-columns: 60% 40%;
    grid-template-areas:
      "output html"
      "output css"
      "output js"
      "statusbar statusbar";
    .resizer {
      right: 0;
    }
    .output-pane {
      padding-right: 10px;
    }
  }
  &.top,
  &.bottom {
    grid-template-columns: repeat(3, 1fr);
    .resizer {
      width: 100%;
      height: 10px;
      cursor: row-resize;
      &:hover,
      &.resizing {
        &:before {
          border-color: #eee;
          width: 60px;
        }
      }
      &:before {
        border-top: $resizer-border;
        border-bottom: $resizer-border;
        height: 5px;
        width: 50px;
      }
    }
  }
  &.top {
    grid-template-rows: repeat(2, 1fr) 30px;
    grid-template-areas:
      "html css js"
      "output output output"
      "statusbar statusbar statusbar";
    .resizer {
      top: 0;
    }
    .output-pane {
      padding-top: 10px;
    }
  }
  &.bottom {
    grid-template-rows: repeat(2, 1fr) 30px;
    grid-template-areas:
      "output output output"
      "html css js"
      "statusbar statusbar statusbar";
    .resizer {
      bottom: 0;
      &:before {
        bottom: -3px;
      }
    }
    .output-pane {
      padding-bottom: 10px;
    }
  }
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
.pane {
  overflow: hidden;
  .vue-codemirror {
    height: 100%;
  }
  .label {
    color: $grayText;
    height: 30px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    text-transform: uppercase;
    background-color: $lightGray;
    font-size: 0.9em;
  }
}
.output-pane {
  grid-area: output;
  position: relative;
  #iframe {
    border: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .overlay {
    display: block;
    &.resizing {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 100500;
    }
  }
}
.statusbar {
  grid-area: statusbar;
  background-color: $lightGray;
  color: $grayText;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  .changePos {
    border: 0;
    background-color: transparent;
    color: $grayText;
    font-size: 0.9em;
    cursor: pointer;
    outline-style: none;
    &:hover {
      color: lighten($grayText, 50);
    }
  }
}
</style>
