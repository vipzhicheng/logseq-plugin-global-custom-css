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
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal="false"
  >
    <template #header>
      <el-button title="Format" @click="editorStore.format">Format</el-button>
      <el-button title="Save" @click="editorStore.saveToGithubGist"
        >Save</el-button
      >
      <el-button title="Load" @click="editorStore.loadFromGithubGist"
        >Load</el-button
      >
      <el-button title="Clear" @click="editorStore.clear">Clear</el-button>
    </template>
    <Editor />
  </el-dialog>
</template>
<style>
.el-dialog__header {
  padding-bottom: 16px;
}
.el-dialog__body {
  padding: 0;
}
</style>
