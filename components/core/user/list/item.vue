<script setup lang="ts">
defineProps<{
  user: UserDto;
}>();
</script>

<template>
  <li class="user-list-item">
    <img :src="user.profilePicture" />

    <p class="name">{{ user.name }}</p>
    <p class="email">{{ user.email }}</p>
  </li>
</template>

<style scoped>
.user-list-item {
  padding: 6px;
  border-radius: var(--br-small);
  color: #ffffff;
  display: grid;
  grid-template-areas:
    "avatar name"
    "avatar email";
  grid-template-columns: max-content 1fr;
  column-gap: 8px;
  row-gap: 2px;
  border: 1px solid transparent;

  img {
    grid-area: avatar;
    width: 32px;
    height: 32px;
    border-radius: 32px;
  }

  .name {
    grid-area: name;
    font-size: 14px;
    line-height: 1;
    color: #ffffff;
    font-weight: 500;
  }

  .email {
    grid-area: email;
    font-size: 12px;
    line-height: 1;
    color: var(--text-light-contrast);
  }

  &.focused {
    background-color: #282828;
    border-color: #373737;
  }

  &.selected {
    background: #340334;
    border-color: #4e0d35;
  }

  &:focus {
    outline: 1px solid var(--brand);
  }
}
</style>
