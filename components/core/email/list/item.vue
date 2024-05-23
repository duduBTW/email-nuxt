<script setup lang="ts">
defineProps<{
  profilePicture: string;
  primaryText: string;
  secondatyText: string;
  isSelected: boolean;
}>();

// props.email.id ===
</script>

<template>
  <button class="container" :class="{ selected: isSelected }">
    <img
      :src="profilePicture"
      alt="Email sender profile picture"
      class="avatar"
    />

    <div class="right-part">
      <h2>
        {{ primaryText }}
      </h2>

      <p>
        {{ secondatyText }}
      </p>

      <div class="divider" />
    </div>
  </button>
</template>

<style scoped>
.container {
  display: flex;
  gap: 16px;
  position: relative;
  isolation: isolate;

  &:focus {
    outline: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: -12px;
    bottom: 0;
    left: -40vw;
    right: -40vw;
    z-index: -1;
    border-bottom-color: transparent;
  }

  &:hover,
  &:focus {
    &::before {
      background: var(--hover);
    }
  }

  &:focus {
    &::before {
      border: 2px solid var(--brand);
    }

    .divider {
      opacity: 0;
    }
  }

  &.selected {
    &::before {
      background: #fff6ff;
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    border: 1px solid var(--divider);
  }

  .right-part {
    min-width: 0px;
    flex: 1;
  }

  .divider {
    height: 1px;
    flex: 1;
    background: var(--divider);
    margin-top: 12px;
  }

  h2 {
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 2px;
    max-lines: 1;
  }

  p {
    font-size: 14px;
    line-height: 17px;
    color: var(--text-light);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
