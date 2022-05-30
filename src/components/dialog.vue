<script lang="ts" setup>
import Editor from "./Editor.vue";
let show = true;
</script>
<template>
  <el-dialog v-model="show" title="Tips" width="30%" draggable>
    <div class="flex-1">
      <Editor />
    </div>
  </el-dialog>
</template>
