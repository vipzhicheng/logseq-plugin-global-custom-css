import { defineStore } from "pinia";
import { EditorFromTextArea } from "codemirror";

import * as CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";

import "codemirror/addon/dialog/dialog.css";
// import "codemirror/theme/material.css";
import "codemirror/theme/solarized.css";

// import "@/theme/base2tone-sea-dark.css";

// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/coffeescript/coffeescript";
import "codemirror/mode/markdown/markdown";

import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/continuelist";

import "codemirror/keymap/vim.js";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    visible: false,
    cm: null as EditorFromTextArea | null,
  }),
  actions: {
    open() {
      this.visible = true;
    },

    async init(selector: string) {
      const editor = document.getElementById(selector) as HTMLTextAreaElement;
      editor.value = "";

      // @ts-ignore
      CodeMirror.commands.save = this.save;

      // @ts-ignore
      CodeMirror.Vim.defineEx("wq", "wq", this.saveAndQuit);

      // @ts-ignore
      CodeMirror.Vim.defineEx("quit", "q", this.quitWithoutSaving);

      // @ts-ignore
      CodeMirror.Vim.defineEx("help", "h", this.help);

      const cm = CodeMirror.fromTextArea(editor as HTMLTextAreaElement, {
        mode: "markdown",
        theme: "solarized",
        // // @ts-ignore
        // minimap: true,
        lineNumbers: true,
        lineWrapping: true,
        // autofocus: true,
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: true,
        showCursorWhenSelecting: true,
        keyMap: "vim",
      });

      cm.addKeyMap({
        "Ctrl-]": () => {
          // @ts-ignore
          CodeMirror.Vim.exitInsertMode(cm);
        },
      });

      const keyMapDefault = CodeMirror.normalizeKeyMap({
        // indent with spaces
        Tab: (cm: CodeMirror.Editor) => {
          // @ts-ignore
          const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        },
        Enter: "newlineAndIndentContinueMarkdownList",
      });

      cm.setOption("extraKeys", keyMapDefault);

      this.cm = cm;
      return cm;
    },
  },
});
