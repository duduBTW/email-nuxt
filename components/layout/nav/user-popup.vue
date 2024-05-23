<script setup lang="ts">
defineProps<{
  user: UserDto;
  users: UserDto[];
  open: boolean;
}>();
const emit = defineEmits(["focusout", "overlayClick"]);
const trapRef = useFocusTrap(() => emit("focusout"));
</script>

<template>
  <Transition>
    <div v-if="open" class="popup" ref="trapRef" @click.stop="">
      <p class="name">{{ user.name }}</p>
      <p class="email-address">{{ user.email }}</p>

      <div class="divider" />

      <div class="configs">
        <NuxtLink href="/profile" class="item">
          <div class="icon-container">
            <font-awesome class="icon" :icon="PROJECT_ICONS.USER" />
          </div>

          <span>Profile</span>
        </NuxtLink>
        <NuxtLink href="/settings" class="item">
          <div class="icon-container">
            <font-awesome class="icon" :icon="PROJECT_ICONS.GEAR" />
          </div>
          <span>Settings</span>
        </NuxtLink>
      </div>

      <div class="divider" />

      <div class="configs">
        <p class="title">Other accounts</p>
        <button class="user" v-for="user in users">
          <img class="avatar" :src="user.profilePicture" />
          <span class="text">{{ user.name }}</span>
        </button>

        <button class="item">
          <div class="icon-container">
            <font-awesome class="icon" :icon="PROJECT_ICONS.USER_PLUS" />
          </div>
          <span>Add account</span>
        </button>
      </div>
    </div>
  </Transition>

  <div v-if="open" class="overlay" @click="emit('overlayClick')" />
</template>

<style scoped>
.popup {
  top: 0px;
  right: 14px;
  position: absolute;
  background-color: var(--bg-contrast);
  width: 200px;
  border-bottom-left-radius: var(--br-large);
  border-bottom-right-radius: var(--br-large);
  padding: 10px;
  z-index: -1;
  box-shadow: var(--shadow);
  color: #fff;

  &.v-enter-active,
  &.v-leave-active {
    transition: transform 175ms ease-in;
  }

  &.v-enter-from {
    pointer-events: none;
    transform: translateY(-100%);
  }

  &.v-leave-to {
    pointer-events: none;
    transform: translateY(-100%);
  }

  .name {
    line-height: 16px;
    font-weight: bold;
    text-transform: capitalize;
  }

  .email-address {
    font-size: 12px;
    line-height: 16px;
    color: var(--text-light-contrast);
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--divider-contrast);
    margin-top: 12px;
  }

  .configs {
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .item {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: var(--br-small);
      font-size: 12px;

      .icon-container {
        width: 20px;
        display: grid;
        place-items: center;
        opacity: 0.42;
      }
    }

    .user {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: var(--br-small);

      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 20px;
      }

      .text {
        font-size: 12px;
      }
    }

    .title {
      font-size: 12px;
      line-height: 1;
      color: var(--text-light-contrast);
    }
  }
}

.overlay {
  position: fixed;
  inset: 0;
  pointer-events: all;
  z-index: -2;
}
</style>
