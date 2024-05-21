<template>
  <div class="empty-list-container">
    <font-awesome class="icon" :icon="PROJECT_ICONS.FODLER_OPEN" />
    <h1>Empty</h1>
    <p>Wait until someone send you someting!</p>
  </div>
</template>

<style scoped>
.empty-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  p {
    color: var(--text-light);
  }

  .icon {
    font-size: 32px;
    opacity: 0.22;
    padding-bottom: 16px;
  }
}
</style>
