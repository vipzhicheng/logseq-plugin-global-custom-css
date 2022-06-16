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
      <el-button @click="editorStore.apply" type="primary">Apply</el-button>
      <el-button @click="editorStore.format">Format</el-button>
      <el-button @click="editorStore.saveToGithubGist"
        >Save to Github Gist</el-button
      >
      <el-button @click="editorStore.loadFromGithubGist"
        >Load from Github Gist</el-button
      >
      <el-button @click="editorStore.clear">Clear</el-button>
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
