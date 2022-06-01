<script setup lang="ts">
import "@logseq/libs";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();

onMounted(async () => {
  await editorStore.init("editor");
});
</script>
<template>
  <div class="flex-1 h-96">
    <textarea id="editor"></textarea>
  </div>
</template>
<style>
.CodeMirror {
  width: 100%;
  height: 100%;
}

.CodeMirror-hints {
  z-index: 9999;
}
</style>
