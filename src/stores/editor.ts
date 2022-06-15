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

// For auto close brackets
import "codemirror/addon/edit/closebrackets";

// For auto complete
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/css-hint.js";

// For fullscreen
import "codemirror/addon/display/fullscreen.js";

// Color picker
import "codemirror-colorpicker/dist/codemirror-colorpicker.css";
import "codemirror-colorpicker";

import beautify from "simply-beautiful";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    visible: true,
    cm: null as EditorFromTextArea | null,
  }),
  actions: {
    show() {
      this.visible = true;
    },

    async saveToGithubGist() {
      if (this.cm as EditorFromTextArea) {
        let style = this.cm.getValue();

        const data = {
          description: "Logseq Global Custom CSS",
          public: false,
          files: {
            "logseq_global_custom.css": {
              content: style,
            },
          },
        };

        await fetch("https://api.github.com/gists", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "token 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",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        // const octokit = new Octokit({
        //   auth: "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",
        // });
        // await octokit.rest.gists.create({
        //   request: {
        //     fetch,
        //   },
        //   description: "Logseq Global Custom CSS",
        //   public: false,
        //   files: {
        //     "global_custom.css": {
        //       content: style,
        //     },
        //   },
        // });
      }
    },

    format() {
      if (this.cm as EditorFromTextArea) {
        let style = this.cm.getValue();
        var options = {
          indent_size: 2,
        };
        let formated = beautify.css(style, options);
        this.cm.setValue(formated);
      }
    },

    apply() {
      if (this.cm as EditorFromTextArea) {
        let style = this.cm.getValue();

        logseq.updateSettings({
          styles: {
            global: style,
          },
        });
        style = "/* Global Custom CSS */\n" + style;
        logseq.provideStyle({
          key: "global",
          style,
        });
      }
    },

    async init(selector: string) {
      const editor = document.getElementById(selector) as HTMLTextAreaElement;

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
        autoCloseBrackets: true,

        // @ts-ignore
        colorpicker: {
          mode: "edit",
          onChange: function (color) {
            // Called when a color is selected.
            console.log(color);
          },
        },
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
        // when ctrl+k  keys pressed, color picker is able to open.
        "Ctrl-K": (cm: CodeMirror.Editor) => {
          console.log(cm);
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
          const settings = logseq.settings;
          if (settings.styles && settings.styles.global) {
            cm.setValue(settings.styles.global);
          }
        }
      });

      return cm;
    },
  },
});
