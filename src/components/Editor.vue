<script setup lang="ts">
import "@logseq/libs";
import { useEditorStore } from "@/stores/editor";

let show = true;
// const editorStore = useEditorStore();

// onMounted(async () => {
//   editorStore.init("editor");
// });
</script>
<template>
  <div>
    <el-dialog v-model="show" title="Tips" width="30%" draggable>
      <div class="flex-1">
        <textarea id="editor"></textarea>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">Cancel</el-button>
          <el-button type="primary" @click="show = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
