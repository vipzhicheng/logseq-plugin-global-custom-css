import "@logseq/libs";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { useEditorStore } from "@/stores/editor";

function createModel() {
  return {
    openModal() {
      logseq.showMainUI();
    },
  };
}

async function triggerBlockModal() {
  createModel().openModal();
}

const main = async () => {
  const settings = logseq.settings;
  if (settings.styles && settings.styles.global) {
    const style = "/* Global Custom CSS */\n" + settings.styles.global;
    logseq.provideStyle({
      key: "global",
      style,
    });
  }

  const app = createApp(App);
  app.use(createPinia());
  app.mount("#app");

  // logseq.provideModel(createModel());

  logseq.on("ui:visible:changed", (visible) => {
    if (!visible) {
      return;
    }

    const editorStore = useEditorStore();

    editorStore.show();
  });
  logseq.Editor.registerSlashCommand("Test", triggerBlockModal);
  logseq.Editor.registerBlockContextMenuItem("Test", triggerBlockModal);

  logseq.App.registerUIItem("pagebar", {
    key: "logseq-plugin-starter-vite-tailwindcss-pagebar",
    template: `
      <a data-on-click="openModal" class="button" title="Open modal" style="font-size: 18px">
        P
      </a>
    `,
  });

  logseq.App.registerUIItem("toolbar", {
    key: "logseq-plugin-starter-vite-tailwindcss-toolbar",
    template: `
      <a class="button" data-on-click="openModal" title="Open modal" style="font-size: 18px">
        T
      </a>
    `,
  });

  document.addEventListener("click", (e) => {
    logseq.hideMainUI();
  });
};

logseq.ready(createModel(), main).catch(console.error);
