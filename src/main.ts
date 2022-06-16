import "@logseq/libs";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { useEditorStore } from "@/stores/editor";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

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

const defineSettings: SettingSchemaDesc[] = [
  {
    key: "personal_access_token",
    type: "string",
    default: "",
    title: "Personal Access Token",
    description:
      'Apply Github Personal Access Token on https://github.com/settings/tokens, please only grant "Gist create" permisson for this token.',
  },
  {
    key: "gist_id",
    type: "string",
    default: "",
    title: "Gist ID",
    description:
      "You need to create a gist on Github first, and then find out the gist id, e.g. https://gist.github.com/[user]/[gist_id]",
  },
];

logseq.useSettingsSchema(defineSettings);

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

  logseq.on("ui:visible:changed", (visible) => {
    if (!visible) {
      return;
    }

    const editorStore = useEditorStore();

    editorStore.show();
  });

  logseq.App.registerUIItem("toolbar", {
    key: "logseq-plugin-starter-vite-tailwindcss-toolbar",
    template: `
      <a class="button" style="padding: 0;" data-on-click="openModal" title="Global Custom CSS" >
      <svg t="1655359050604" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5031" data-spm-anchor-id="a313x.7781069.0.i27" width="20" height="20"><path d="M361.28 853.67h-1c-64.14-0.32-111.49-30-124.48-39.09-33.47-23.43-61.42-63.11-80.82-114.74-17.15-45.65-26.6-98.32-26.6-148.33 0-51.48 10.21-101.42 30.34-148.46 19.43-45.39 47.23-86.14 82.63-121.12 35.37-34.95 76.56-62.4 122.43-81.57 47.48-19.84 97.89-29.91 149.83-29.91 51.95 0 102.36 10.06 149.83 29.91 45.87 19.17 87.06 46.61 122.43 81.57 35.4 34.98 63.2 75.73 82.63 121.12 20.13 47.03 30.34 96.98 30.34 148.46 0 32.15 0 72.16-15.91 107.63-9.52 21.23-29.24 33.94-58.62 37.78-19.38 2.54-41.77 1.44-67.69 0.18-75-3.65-168.33-8.2-233.38 73.46-54.6 68.56-118.02 83.1-161.96 83.11z m152.35-619.22c-85.88 0-166.59 33.03-227.28 93-60.59 59.87-93.95 139.44-93.95 224.05 0 42.51 7.99 87.19 22.51 125.82 14.63 38.93 35.09 69.05 57.61 84.82 18.84 13.19 51.87 27.34 88.09 27.52h0.7c43.07 0 80.71-19.84 111.9-58.99 85.48-107.3 206.48-101.41 286.55-97.51 18.63 0.91 34.72 1.69 47.68 1.03 11.04-0.57 15.96-2.07 17.8-2.83 9.62-22.81 9.62-53.08 9.62-79.86 0-84.62-33.37-164.19-93.95-224.05-60.69-59.97-141.41-93-227.28-93z m310.93 398.49c-0.01 0-0.01 0 0 0-0.01 0-0.01 0 0 0z" p-id="5032" fill="#d81e06" data-spm-anchor-id="a313x.7781069.0.i20" class=""></path><path d="M271.62 644.31a66.11 66.57 0 1 0 132.22 0 66.11 66.57 0 1 0-132.22 0Z" p-id="5033" fill="#1296db" data-spm-anchor-id="a313x.7781069.0.i17" class=""></path><path d="M293.45 451.7a51.63 52 0 1 0 103.26 0 51.63 52 0 1 0-103.26 0Z" p-id="5034" fill="#82529d" data-spm-anchor-id="a313x.7781069.0.i18" class=""></path><path d="M437.12 335.46a49.05 49.4 0 1 0 98.1 0 49.05 49.4 0 1 0-98.1 0Z" p-id="5035" fill="#d4237a" data-spm-anchor-id="a313x.7781069.0.i21" class=""></path><path d="M599.66 367.02a49.04 49.39 0 1 0 98.08 0 49.04 49.39 0 1 0-98.08 0Z" p-id="5036" fill="#1afa29" data-spm-anchor-id="a313x.7781069.0.i22" class=""></path><path d="M681.94 504.15a49.04 49.39 0 1 0 98.08 0 49.04 49.39 0 1 0-98.08 0Z" p-id="5037" fill="#e98f36" data-spm-anchor-id="a313x.7781069.0.i23" class="selected"></path></svg>
      </a>
    `,
  });

  document.addEventListener("click", (e) => {
    logseq.hideMainUI();
  });
};

logseq.ready(createModel(), main).catch(console.error);
