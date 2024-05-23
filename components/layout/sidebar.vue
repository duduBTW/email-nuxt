<script setup lang="ts">
type SidebarItem = {
  label: string;
  iconName: string;
  to: string;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    iconName: PROJECT_ICONS.HOUSE,
    label: "Home",
    to: "/",
  },
  {
    iconName: PROJECT_ICONS.PAPER_PLANE,
    label: "Sent",
    to: "/sent",
  },
  {
    iconName: PROJECT_ICONS.PEN_CLIP,
    label: "Draft",
    to: "/test",
  },
  {
    iconName: PROJECT_ICONS.HOUSE,
    label: "Trash",
    to: "/test",
  },
  {
    iconName: PROJECT_ICONS.HOUSE,
    label: "Liked",
    to: "/test",
  },
];
</script>

<template>
  <aside>
    <a class="sidebar-item skip-navigation" href="#main">
      <span>Skip navegation</span>
      <font-awesome class="icon" :icon="PROJECT_ICONS.ANGLES_RIGHT" />
    </a>

    <NuxtLink
      v-for="sidebar in SIDEBAR_ITEMS"
      :key="sidebar.label"
      :to="sidebar.to"
      class="sidebar-item"
    >
      <font-awesome class="icon" :icon="sidebar.iconName" />
      <span>{{ sidebar.label }}</span>
    </NuxtLink>
  </aside>
</template>

<style scoped>
aside {
  grid-area: sidebar;
  padding: 52px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  .sidebar-item {
    width: 140px;
    height: 28px;
    padding: 0px 12px;
    gap: 8px;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: var(--br-medium);

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    &.router-link-active {
      background: var(--brand-bg);
      color: var(--brand);
      font-weight: 600;
    }

    .icon {
      opacity: 0.42;
    }
  }

  .skip-navigation {
    justify-content: space-between;
    position: absolute;
    top: 12px;
    left: -100%;
    transition: left 0.1s ease;
    font-size: 12px;

    &:focus {
      left: 12px;
    }

    .icon {
      font-size: 12px;
    }
  }
}
</style>
