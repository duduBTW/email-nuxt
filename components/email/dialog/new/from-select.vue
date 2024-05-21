<script setup lang="ts">
const popupOpen = ref(false);
const { data: users } = await useConnectedUsersFetch();
const emailStore = useNewEmailStore();

const senderName = computed(
  () =>
    users.value?.find((user) => user.id === emailStore.formData.sender)?.name
);

const iconName = computed(() =>
  popupOpen.value ? PROJECT_ICONS.CHEVRON_UP : PROJECT_ICONS.CHEVRON_DOWN
);

function handleOverlayClick(event: MouseEvent) {
  event.stopPropagation();
  popupOpen.value = false;
}
</script>

<template>
  <div class="input-group" ref="trapRef">
    <label for="sender">From:</label>
    <div style="flex: 1; display: flex">
      <button type="button" class="trigger" @click="popupOpen = true">
        <span>{{ senderName }}</span>
        <font-awesome class="expand-icon" :icon="iconName" />
      </button>
      <div
        v-if="popupOpen"
        class="overlay"
        @click="(event) => handleOverlayClick(event)"
      />

      <input-autocomplete :open="popupOpen">
        <email-dialog-new-select
          @close-popup="popupOpen = false"
          :users="users"
        />
      </input-autocomplete>
    </div>
  </div>
</template>

<style scoped>
.input-group {
  position: relative;
  display: flex;
  align-items: center;

  label {
    display: block;
    width: 80px;
    padding-right: 20px;
  }

  .trigger {
    flex: 1;
    border: none;
    border-bottom: 1px solid var(--divider);
    font-size: 14px;
    line-height: 26px;
    padding: 0px;
    display: flex;
    justify-content: space-between;

    &:focus {
      outline: none;
      border-bottom-color: var(--brand);
    }

    .expand-icon {
      color: var(--text-light);
    }
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}
</style>
