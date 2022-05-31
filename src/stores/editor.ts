import { defineStore } from "pinia";
import { EditorFromTextArea } from "codemirror";

import * as CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";

// import "codemirror/addon/dialog/dialog.css";
// import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";

// import "@/theme/base2tone-sea-dark.css";

// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/coffeescript/coffeescript";
import "codemirror/mode/css/css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/display/fullscreen.css";

// import "codemirror/addon/dialog/dialog.js";
// import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/edit/matchbrackets.js";
// import "codemirror/addon/edit/continuelist";

import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/display/fullscreen.js";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    visible: true,
    cm: null as EditorFromTextArea | null,
  }),
  actions: {
    show() {
      this.visible = true;
    },

    async init(selector: string) {
      const editor = document.getElementById(selector) as HTMLTextAreaElement;
      editor.value = "";

      const cm = CodeMirror.fromTextArea(editor as HTMLTextAreaElement, {
        mode: "css",
        theme: "monokai",
        // // @ts-ignore
        // minimap: true,
        lineNumbers: true,
        lineWrapping: false,
        // autofocus: true,
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: true,
        showCursorWhenSelecting: true,
      });

      cm.addKeyMap({
        "Ctrl-Space": "autocomplete",
        F11: function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
      });

      const keyMapDefault = CodeMirror.normalizeKeyMap({
        // indent with spaces
        Tab: (cm: CodeMirror.Editor) => {
          // @ts-ignore
          const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        },
      });

      cm.setOption("extraKeys", keyMapDefault);

      this.cm = cm;

      logseq.on("ui:visible:changed", (visible) => {
        if (!visible) {
          return;
        }
        if (cm) {
          cm.refresh();
          cm.focus();
        }
      });

      return cm;
    },
  },
});
