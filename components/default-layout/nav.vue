<script setup lang="ts">
const profielButtoRef = ref<HTMLDivElement | null>(null);
const showPopup = ref(false);
const dialog = useDialog();
const { data: users } = await useConnectedUsersFetch();
const { data: user } = await useApiFetch<UserDto>("/user");

const emailStore = useNewEmailStore();

const newEmailDialogOpen = computed(() => dialog.value?.type === "newEmail");

function newMail() {
  dialog.value = {
    type: "newEmail",
  };
}
</script>

<template>
  <nav>
    <div class="left-part">
      <button class="new-mail" @click="newMail()">
        <font-awesome class="new-mail-icon" :icon="PROJECT_ICONS.PEN_NIB" />
        <span>New Mail</span>
      </button>

      <label class="search-input">
        <font-awesome
          class="search_icon"
          :icon="PROJECT_ICONS.MAGNIFYING_GLASS"
        />
        <input type="text" placeholder="Search..." />
      </label>
    </div>

    <div class="right-part dialog-container-size">
      <button
        id="send-button"
        class="send-button"
        v-if="newEmailDialogOpen"
        @click="emailStore.submit()"
        :disabled="!emailStore.canSubmit"
      >
        <font-awesome class="icon" :icon="PROJECT_ICONS.PAPER_PLANE" />
        <span>Send</span>
      </button>

      <div class="profile-popup-container">
        <button
          ref="profielButtoRef"
          @click="showPopup = !showPopup"
          class="profile-button"
        >
          <img
            class="avatar"
            :src="user?.profilePicture ?? ''"
            alt="Your profile picture"
          />
        </button>
        <default-layout-profile-popup
          :user="user!"
          :users="users ?? []"
          @focusout="profielButtoRef?.focus()"
          @overlay-click="showPopup = false"
          :open="Boolean(user) && showPopup"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

nav {
  grid-area: nav;
  height: 52px;
  display: flex;
  align-items: center;

  .left-part {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;

    .new-mail {
      border: none;
      width: 112px;
      height: 36px;
      border-radius: var(--br-large);
      color: #fff;
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
      background: linear-gradient(145deg, #e46ee7, #ed6aba);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &:hover {
        background: #e46ee7;
      }

      .new-mail-icon {
        opacity: 0.82;
      }
    }

    .search-input {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      height: 36px;
      flex: 1;
      margin-right: 12px;

      &:focus-within {
        background-color: white;
        border-radius: var(--br-large);
      }

      input {
        background: transparent;
        border: transparent;
        flex: 1;
        flex-shrink: 1;
        min-width: 0px;

        &:focus {
          outline: none;
        }
      }

      .search_icon {
        font-size: 12px;
        color: var(--text-light);
      }
    }
  }

  .right-part {
    display: flex;
    align-items: center;

    .profile-popup-container {
      margin-left: auto;
      z-index: 2;

      .profile-button {
        position: relative;
        border-radius: 32px;
        overflow: hidden;
        border: 1px solid var(--divider);
        z-index: 3;

        .avatar {
          width: 32px;
          height: 32px;
        }
      }
    }

    .send-button {
      --padding-x: 12px;

      color: var(--brand);
      font-weight: 600;
      padding: 4px var(--padding-x);
      margin-left: calc(var(--padding-x) * -1);
      display: flex;
      gap: 8px;
      align-items: center;
      border-radius: var(--br-medium);
      transition: background 135ms ease;

      &:hover {
        transition: background 75ms ease;
        background: var(--hover);
      }

      .icon {
        opacity: 0.42;
      }

      &:disabled {
        color: var(--text-light);

        &:hover {
          background: transparent;
        }
      }
    }
  }
}
</style>
