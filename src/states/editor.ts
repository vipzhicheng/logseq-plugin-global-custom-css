import { defineStore } from "pinia";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    visible: false,
  }),
  actions: {
    open() {
      this.visible = true;
    },
  },
});
