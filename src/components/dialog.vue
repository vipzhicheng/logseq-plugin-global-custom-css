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
    <template #header>
      <el-button @click="editorStore.submit">Submit</el-button>
      <el-button @click="editorStore.format">Format</el-button>
    </template>
    <Editor />
  </el-dialog>
</template>
