<script setup lang="ts">
const snackBar = useSnackbar();
const showSnack = computed(() => typeof snackBar.state.value !== "undefined");
</script>

<template>
  <Transition>
    <div class="snack" v-if="showSnack">
      {{ snackBar.state.value }}
    </div>
  </Transition>
</template>

<style scoped>
.snack {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-contrast);
  color: #fff;
  height: 32px;
  border-radius: var(--br-large);
  display: grid;
  place-content: center;
  padding: 0px 16px;
  box-shadow: var(--shadow);

  &.v-enter-active,
  &.v-leave-active {
    transition: all 240ms ease;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translate(-50%, 20%);
  }
}
</style>
