<script setup lang="ts">
const state = useDialog();
</script>

<template>
  <div
    v-if="typeof state !== 'undefined'"
    class="container dialog-container-size"
  >
    <email-dialog-new v-if="state.type === 'newEmail'" />
    <email-dialog-details
      v-else-if="state.type === 'email'"
      :metadata="state.metadata"
    />
  </div>
</template>

<style scoped>
.container {
  background: #fff;
  border-radius: var(--br-medium);
  padding: 16px;
  animation: slide-in-from-left 125ms ease-in;
}

@keyframes slide-in-from-left {
  from {
    margin-right: -40px;
  }
}
</style>
