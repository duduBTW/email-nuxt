<template>
  <div class="layout">
    <default-layout-sidebar />
    <default-layout-nav />
    <main id="#main">
      <div class="list">
        <slot />
      </div>

      <email-dialog-all />
      <snackbar />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "sidebar nav"
    "sidebar main";
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content 1fr;
  background: #f3f8f5;
  height: 100%;
  padding-right: 24px;
  padding-bottom: 24px;

  main {
    grid-area: main;
    display: flex;
    gap: 12px;
    max-height: 100%;
    overflow: hidden;

    .list {
      overflow: hidden;
      flex: 1;
      height: 100%;
      background: #fff;
      border-radius: var(--br-large);
      padding: 16px;
    }
  }
}
</style>
