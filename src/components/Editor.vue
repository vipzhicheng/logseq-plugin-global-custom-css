<script lang="ts" setup>
let show = true;
</script>
<template>
  <div>
    <el-dialog v-model="show" title="Tips" width="30%" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">Cancel</el-button>
          <el-button type="primary" @click="show = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
