<script setup lang="ts">
defineProps<{
  open: boolean;
}>();
</script>

<template>
  <Transition>
    <div class="popup-container" v-if="open">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.popup-container {
  position: absolute;
  top: calc(100% + 4px);
  left: 2;
  background-color: var(--bg-contrast);
  z-index: 2;
  color: white;
  padding: 6px;
  border-radius: var(--br-large);
  width: 320px;
  box-shadow: var(--shadow);

  &.v-enter-active,
  &.v-leave-active {
    transition: transform 155ms ease-in, opacity 126ms ease-in;
  }

  &.v-enter-from {
    pointer-events: none;
    transform: translateY(-6px);
  }

  &.v-leave-to {
    pointer-events: none;
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
