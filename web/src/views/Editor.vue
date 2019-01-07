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
          :src="'data:text/html;charset=utf-8;base64,' + base64code"
        ></iframe>
      </div>
      <div class="statusbar">
        <div class="left">
          <span :class="compressedSizeColor">
            {{ compressedCode.length }} bytes
          </span>
        </div>
        <div class="right">
          <button @click="minifyCode">minify</button>
          <button @click="beautifyCode">beautify</button>
          <div class="divider"></div>
          <button @click="panesPosition='left'">left</button>
          <button @click="panesPosition='right'">right</button>
          <button @click="panesPosition='top'">top</button>
          <button @click="panesPosition='bottom'">bottom</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// codemirror
import CodeMirror from "codemirror";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/base16-dark.css";

// addons
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/simplescrollbars.css";
import emmet from "@emmetio/codemirror-plugin";

// other libs
import { js as jsBeautify } from "js-beautify";
import { html as htmlBeautify } from "js-beautify";
import { css as cssBeautify } from "js-beautify";
import { LZMA } from "lzma/src/lzma-c-min.js";

export default {
  name: "editor",
  data() {
    return {
      htmlCode: '<div class="test">hello there</div>',
      cssCode: ".test {\n\tcolor: red;\n}",
      jsCode: "document.write('test')",
      editorPanesStyles: {
        "grid-template-columns": "",
        "grid-template-rows": ""
      },
      resizing: false,
      panesPosition: "left",
      changeTimer: null,
      base64code: "",
      compressedCode: ""
    };
  },
  computed: {
    compressedSizeColor() {
      const size = this.compressedCode.length;
      if (size < 2000) return "green";
      else if (size < 4000) return "yellow";
      return "red";
    }
  },
  created() {
    this.setCode();
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
        this.setCode();
      }, 2000);
    },
    minify: code =>
      code
        .replace(/\/\/(.*)\n/g, "")
        .replace(/\n/g, " ")
        .replace(/ {2}|\t|\/\*(.*?)\*\//g, "")
        .replace(/( |)(\{|\}|\)|\(|\+|-|\*|\/)( |)/g, "$2"),
    minifyCode() {
      this.htmlCode = this.minify(this.htmlCode);
      this.cssCode = this.minify(this.cssCode);
      this.jsCode = this.minify(this.jsCode);
    },
    beautifyCode() {
      this.htmlCode = htmlBeautify(this.htmlCode);
      this.cssCode = cssBeautify(this.cssCode);
      this.jsCode = jsBeautify(this.jsCode);
    },
    setCode() {
      // eslint-disable-next-line
      const code = `<style>${this.cssCode}</style>${this.htmlCode}<script>${this.jsCode}<\/script>`;
      this.compressedCode = this.encodeString(code);
      this.base64code = `${btoa(code)}`;
    },
    encodeString: string => {
      const Uint8ArrayToBase64 = bytes =>
        // eslint-disable-next-line
        btoa(bytes.reduce((a, v) => a += String.fromCharCode(v), ""));
      const encodeString = (string, level = 9) =>
        Uint8ArrayToBase64(new Uint8Array(LZMA.compress(string, level)));
      let uncomp = btoa(string);
      let comp = encodeString(string);
      return uncomp.length > comp.length ? comp : "~" + uncomp;
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ {
  .CodeMirror {
    height: calc(100% - 30px);
    font-size: 0.97em;
  }
  .cm-s-base16-dark.CodeMirror {
    background-color: $editorThemeBg;
  }
  .CodeMirror-gutters {
    background-color: darken($darkgray, 10);
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
    background-color: $darkgray;
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
  background-color: darken($darkgray, 5);
  color: $grayText;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 0.9em;
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .divider {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: lighten($darkgray, 15);
    margin: 0 5px;
  }
  button {
    border: 0;
    background-color: transparent;
    color: $grayText;
    cursor: pointer;
    outline-style: none;
    &:hover {
      color: lighten($grayText, 50);
    }
  }
  .green {
    color: lighten($green, 20);
  }
  .yellow {
    color: $yellow;
  }
  .orange {
    color: $orange;
  }
  .red {
    color: $red;
  }
}
</style>
