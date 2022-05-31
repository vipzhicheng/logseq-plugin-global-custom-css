<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
</script>
<template>
  <el-dialog
    v-model="editorStore.visible"
    title="Tips"
    width="50%"
    draggable
    :append-to-body="true"
  >
    <Editor />
  </el-dialog>
</template>
