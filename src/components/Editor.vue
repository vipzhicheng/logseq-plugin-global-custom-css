<script setup lang="ts">
import "@logseq/libs";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();

onMounted(async () => {
  await editorStore.init("editor");
});
</script>
<template>
  <div>
    <el-dialog v-model="show" title="Tips" width="30%" draggable>
      <div class="flex-1">
        <textarea id="editor"></textarea>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.CodeMirror {
  width: 100%;
  height: 100%;
}
</style>
