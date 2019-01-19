<template>
  <div id="editor">
    <modal title="Share this project" ref="share">
      <div class="line" v-for="(link, i) in shareLinks" :key="i">
        <div class="label">
         <div class="text">{{ link.title }}: </div>
        </div>
        <div class="input-field" v-if="!link.button">
         <input type="text" :value="link.link">
        </div>
        <div class="link">
          <a :href="link.link" target="_blank">
            <img :src="require(`@/assets/link.svg`)">
          </a>
        </div>
      </div>
    </modal>
    <modal title="Are you sure?" ref="delete">
      <div class="delete">
        <div class="text">
          <p>
            Are you sure you want to delete this project?
          </p>
          <p>There is no way back</p>
        </div>
        <div class="buttons">
          <div class="accent" @click="deleteProject">Yeah</div>
          <div class="close">No</div>
        </div>
      </div>
    </modal>
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
          <span :class="compressedSizeColor" v-if="compressedSize > 45">
            {{ compressedSize }} bytes
          </span>
          <span v-else>Size is loading</span>
        </div>
        <div class="right">
          <template  v-if="$route.params.id">
            <template  v-if="$store.state.user">
              <button @click="deleteProjectDialog">delete</button>
              <div class="divider"></div>
            </template>
            <button @click="shareProject">share</button>
            <div class="divider"></div>
          </template>
          <button @click="minifyCode">minify</button>
          <button @click="beautifyCode">beautify</button>
          <div class="divider"></div>
          <button @click="panesPosition='left'" class="left">
            <img :src="require(`@/assets/panels-icon.svg`)">
          </button>
          <button @click="panesPosition='right'" class="right">
            <img :src="require(`@/assets/panels-icon.svg`)">
          </button>
          <button @click="panesPosition='top'" class="top">
            <img :src="require(`@/assets/panels-icon.svg`)">
          </button>
          <button @click="panesPosition='bottom'" class="bottom">
            <img :src="require(`@/assets/panels-icon.svg`)">
          </button>
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
import { LZMA } from "lzma/src/lzma_worker-min.js";

// local
import { EventBus } from "@/event-bus.js";
import request from "@/request";

import Modal from "@/components/Modal";

export default {
  name: "editor",
  data() {
    return {
      htmlCode: "",
      cssCode: "",
      jsCode: "",
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
    },
    compressedSize() {
      return this.compressedCode.length;
    },
    pageAlias() {
      return `${location.origin}/p/${this.$route.params.id}`;
    },
    pageUrl() {
      return `${location.origin}/p#${this.compressedCode}`;
    },
    ittyBitty() {
      return `https://itty.bitty.site/#${this.$store.state.editorTitle}/${
        this.compressedCode
      }`;
    },
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "Check out my new project\n"
      )}&url=${this.ittyBitty.replace("#", "%23")}`;
    },
    shareLinks() {
      return [
        {
          title: "Alias",
          link: this.pageAlias
        },
        {
          title: "Full URL",
          link: this.pageUrl
        },
        {
          title: "Itty bitty",
          link: this.ittyBitty
        }
      ];
    }
  },
  created() {
    emmet(CodeMirror);
    EventBus.$on("save-project", this.saveProject);
  },
  async mounted() {
    this.setCode();
    if (this.$route.params.id) {
      let project;
      try {
        project = await this.getProject(this.$route.params.id);
        this.title = project.title;
      } catch (e) {
        EventBus.$emit("error", "Not found", "Project not found");
        this.$router.push("/");
      } finally {
        const code = this.decodeString(project.code);
        // eslint-disable-next-line
        const regex = new RegExp("^<style>([^]*)<\/style>([^]*)<script>([^]*)<\/script>$", "g");
        if (regex.test(code)) {
          this.$store.commit("updateEditorTitle", project.title);
          this.$store.commit("updateEditorAuthor", project.user.name);
          [this.cssCode, this.htmlCode, this.jsCode] = code
            .split(regex)
            .slice(1, -1);
        } else {
          EventBus.$emit("error", "Code Error", "Project's code is broken");
          this.$router.push("/");
        }
      }
    } else {
      this.$store.commit("updateEditorAuthor", "");
      this.$store.commit("updateEditorTitle", "");
    }
  },
  beforeDestroy() {
    EventBus.$off("save-project", this.saveProject);
    this.$store.commit("updateEditorTitle", "");
  },
  components: {
    codemirror,
    Modal
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
    async getProject(id) {
      return await request("api/projects/" + id);
    },
    async saveProject() {
      EventBus.$emit("editor-new-change", false);
      const id = this.$route.params.id;
      if (id) {
        const response = await request("api/projects/" + id, "PUT", {
          code: this.getCode(true),
          title: this.$store.state.editorTitle
        });
        if (response.uuid === id) {
          EventBus.$emit("success", "Saved", "Successfully saved");
        } else {
          EventBus.$emit("error", "Saving error");
        }
      } else {
        const response = await request("api/projects/", "POST", {
          code: this.getCode(true),
          title: this.$store.state.editorTitle
        });
        if (response.uuid) {
          EventBus.$emit("success", "Saved", "Successfully saved");
          this.$router.push("/editor/" + response.uuid);
        } else {
          EventBus.$emit("error", "Saving error");
        }
      }
    },
    async deleteProject() {
      const response = await request(
        "api/projects/" + this.$route.params.id,
        "DELETE"
      );
      if (response.success === this.$route.params.id) {
        this.$router.push("/");
        EventBus.$emit(
          "success",
          "Deleted",
          "Project was successfully deleted"
        );
      } else {
        EventBus.$emit("error", "Error", "Can't touch this");
      }
    },
    deleteProjectDialog() {
      this.$refs.delete.open();
    },
    shareProject() {
      this.$refs.share.open();
    },
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
    editorChanges(e) {
      if (e.state.focused) {
        EventBus.$emit("editor-new-change", true);
      }
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
    getCode(compress = false) {
      // eslint-disable-next-line
      const code = `<style>${this.cssCode}</style>${this.htmlCode}<script>${this.jsCode}<\/script>`;
      return compress ? this.encodeString(code) : code;
    },
    setCode() {
      this.compressedCode = this.getCode(true);
      this.base64code = `${btoa(unescape(encodeURIComponent(this.getCode())))}`;
    },
    encodeString: string => {
      const Uint8ArrayToBase64 = bytes =>
        // eslint-disable-next-line
        btoa(bytes.reduce((a, v) => a += String.fromCharCode(v), ""));
      return Uint8ArrayToBase64(new Uint8Array(LZMA.compress(string, 9)));
    },
    decodeString: base64 => {
      return LZMA.decompress(
        atob(base64)
          .split("")
          .map(v => v.charCodeAt(0))
      );
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

  @include mq($until: tablet) {
    height: auto;
  }

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
    @include mq($until: tablet) {
      display: none;
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
      @include mq($until: tablet) {
        padding-left: 0;
      }
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

  @include mq($until: tablet) {
    height: 100%;
    grid-template-columns: 100% !important;
    grid-template-rows: repeat(3, 1fr) 2fr 30px !important;
    grid-template-areas:
      "html"
      "css"
      "js"
      "output"
      "statusbar" !important;
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
    @include mq($until: tablet) {
      display: none;
    }
  }
  button,
  a {
    text-decoration: none;
    border: 0;
    background-color: transparent;
    color: $grayText;
    cursor: pointer;
    outline-style: none;
    padding: 0;
    margin: 0 5px;
    &:hover {
      color: lighten($grayText, 50);
    }
    &.left img {
      transform: rotate(-90deg);
    }
    &.right img {
      transform: rotate(90deg);
    }
    &.top img {
      transform: rotate(0deg);
      padding-top: 3px;
    }
    &.bottom img {
      transform: rotate(180deg);
      padding-bottom: 3px;
    }
    &.left,
    &.right,
    &.top,
    &.bottom {
      @include mq($until: tablet) {
        display: none;
      }
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
.line {
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    padding: 10px;
  }
  .label {
    width: 100px;
    font-weight: 600;
  }
  .input-field {
    input {
      padding: 10px;
      border: 0;
      background-color: $grayText;
      color: $editorThemeBg;
      width: 250px;
      @include mq($until: tablet) {
        width: 130px;
      }
    }
  }
  .link {
    flex-grow: 1;
    text-align: center;
    img {
      width: 20px;
    }
  }
}
.delete {
  .text {
    font-size: 1.1em;
    font-weight: 800;
    color: $red;
    letter-spacing: 0.06em;
    text-align: center;
    p {
      margin: 5px;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    & > div {
      padding: 10px 20px;
      background-color: $grayText;
      color: $editorThemeBg;
      margin: 15px;
      font-size: 1.3em;
      font-weight: 700;
      border-radius: $borderRadius;
      cursor: pointer;
      transition: all 250ms ease-in-out;
      &:hover {
        background-color: lighten($grayText, 10);
      }
      &.accent {
        background-color: $red;
        &:hover {
          background-color: lighten($red, 10);
        }
      }
    }
  }
}
</style>
