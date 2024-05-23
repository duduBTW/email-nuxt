<script setup lang="ts">
const openToPopover = ref(false);
const to = ref("");
const selectedUserIndex = ref(0);
const changeTimeoutRef = ref<NodeJS.Timeout>();
const updateTextareaOffsetTimeout = ref<NodeJS.Timeout>();
const itemRefs = ref<HTMLElement[]>([]);
const inputOffset = reactive({ top: 0, left: 0 });
const emailStore = useNewEmailStore();

const textareaRef = useFocusTrap<HTMLTextAreaElement>(() => {
  openToPopover.value = false;
});

const showToPopover = computed(
  () => (usersNotAdded.value ?? []).length > 0 && openToPopover.value
);

const { data: users } = await useApiFetch<UserDto[]>("/user/search", {
  query: {
    search: to,
  },
  watch: [to],
  onResponse: ({ response }) => {
    if (response.status !== 200) {
      return;
    }

    selectedUserIndex.value = 0;
  },
});

const usersNotAdded = computed(() =>
  users.value?.filter(
    (user) =>
      !emailStore.formData.recievers?.some(
        (reciever) => reciever.id === user.id
      )
  )
);

defineEmits<{
  change: [event: Event];
}>();

watch(emailStore.formData, updateTextareaOffset);

onMounted(() => {
  window.addEventListener("resize", debouncedUpdateTextareaOffset);
  updateTextareaOffset();
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedUpdateTextareaOffset);
});

function debouncedUpdateTextareaOffset() {
  if (updateTextareaOffsetTimeout.value) {
    clearTimeout(updateTextareaOffsetTimeout.value);
  }

  updateTextareaOffsetTimeout.value = setTimeout(() => {
    updateTextareaOffset();
  }, 100);
}

async function updateTextareaOffset() {
  if (!emailStore.formData.recievers) {
    return;
  }

  const lastRecieverId =
    emailStore.formData.recievers[emailStore.formData.recievers.length - 1]?.id;

  await nextTick();
  const textareaElement = textareaRef.value;
  const itemRefsElements = itemRefs.value;
  if (!textareaElement || !itemRefsElements) {
    return;
  }

  const lastChipElement = itemRefsElements.find(
    (element) => element.dataset.id === lastRecieverId
  );
  if (!lastChipElement) {
    inputOffset.left = 0;
    inputOffset.top = 0;
    return;
  }

  const textareaRects = textareaElement.getClientRects()[0];
  const chipRects = lastChipElement.getClientRects()[0];
  const chipLeft = chipRects.right - textareaRects.left + 4;
  const chipTop = chipRects.top - textareaRects.top;
  const canFitOnTheRight = textareaRects.width - chipLeft >= 320;

  if (canFitOnTheRight) {
    // Places the input on the right side of the last chip
    inputOffset.left = chipLeft;
    inputOffset.top = chipTop;
    return;
  }

  // Places the input bellow the last chip
  const lastElementBottom = chipRects.bottom - textareaRects.top;
  inputOffset.left = 0;
  inputOffset.top = lastElementBottom;
}

function handleChange(event: Event) {
  if (changeTimeoutRef.value) {
    clearTimeout(changeTimeoutRef.value);
  }

  changeTimeoutRef.value = setTimeout(() => {
    to.value = (event.target as HTMLInputElement).value;
  }, 300);
}

function selectUser(user: UserDto) {
  openToPopover.value = false;

  const current = emailStore.formData.recievers ?? [];
  emailStore.formData.recievers = [...current, user];
  to.value = "";
  textareaRef.value?.focus();
}

function removeUser(user: UserDto) {
  const current = emailStore.formData.recievers ?? [];
  emailStore.formData.recievers = current.filter(
    (currentUser) => currentUser.id !== user.id
  );

  if (emailStore.formData.recievers.length === 0) {
    textareaRef.value?.focus();
  }
}

function removeLastitemOnBackspace() {
  const lastUser =
    emailStore.formData.recievers?.[emailStore.formData.recievers.length - 1];
  if (!lastUser) {
    return;
  }

  removeUser(lastUser);
}

function handleKeyDown(event: KeyboardEvent) {
  openToPopover.value = true;

  switch (event.key) {
    case "Backspace":
      handleBackspacePress();
      break;
    case "ArrowDown":
      event.preventDefault();
      handleArrowDownPress();
      break;
    case "ArrowUp":
      event.preventDefault();
      handleArrowUpPress();
      break;
    case "Enter":
    case "Tab":
      if (!showToPopover.value) {
        return;
      }

      event.preventDefault();
      handleEnterPress();
      break;
    case "Escape":
      openToPopover.value = false;
      break;

    default:
      break;
  }
}
function handleBackspacePress() {
  if (to.value !== "") {
    return;
  }

  removeLastitemOnBackspace();
}
function handleArrowUpPress() {
  selectedUserIndex.value = Math.max(selectedUserIndex.value - 1, 0);
}
function handleArrowDownPress() {
  if (!usersNotAdded.value) {
    return;
  }

  selectedUserIndex.value = Math.min(
    selectedUserIndex.value + 1,
    usersNotAdded.value.length - 1
  );
}
function handleEnterPress() {
  const selectedUser = usersNotAdded.value?.[selectedUserIndex.value];
  if (!selectedUser) {
    return;
  }

  selectedUserIndex.value = 0;
  selectUser(selectedUser);
}
</script>

<template>
  <div class="input-group">
    <label for="to">To:</label>

    <div style="flex: 1; display: flex; position: relative">
      <div class="selected-to-container">
        <div
          class="chip"
          :data-id="reciever.id"
          v-for="reciever in emailStore.formData.recievers"
          ref="itemRefs"
        >
          <span class="text"> {{ reciever.name }}</span>
          <button type="button" @click="removeUser(reciever)">
            <font-awesome class="close-icon" :icon="PROJECT_ICONS.CLOSE" />
          </button>
        </div>
      </div>

      <textarea
        id="to"
        @focusin="openToPopover = true"
        :value="to"
        @input="(event) => handleChange(event)"
        @keydown="(event) => handleKeyDown(event)"
        type="text"
        rows="1"
        ref="textareaRef"
        :style="{
          paddingTop: inputOffset.top + 'px',
          paddingLeft: inputOffset.left + 'px',
        }"
        aria-autocomplete="list"
        aria-controls="suggestions"
      />

      <core-popup :open="showToPopover">
        <ul role="listbox" id="suggestions">
          <core-user-list-item
            role="option"
            @click="selectUser(user)"
            @mouseover="selectedUserIndex = index"
            :aria-selected="selectedUserIndex === index"
            v-for="(user, index) in usersNotAdded"
            :key="user.id"
            :user="user"
            :class="{ focused: selectedUserIndex === index }"
          />
        </ul>
      </core-popup>
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

  textarea {
    resize: none;
    font-family: "Montserrat", sans-serif;
    flex: 1;
    border: none;
    border-bottom: 1px solid var(--divider);
    font-size: 14px;
    line-height: 26px;
    padding: 0px;

    &:focus {
      outline: none;
      border-bottom-color: var(--brand);
    }
  }

  .selected-to-container {
    position: absolute;
    top: 0px;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .chip {
      height: 20px;
      padding: 2px 8px;
      border: 1px solid var(--divider);
      border-radius: 222px;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      gap: 4px;

      .text {
        pointer-events: none;
      }
    }

    .close-icon {
      color: var(--error-color);
      margin-top: 1px;
    }
  }
}

ul {
  list-style: none;
}
</style>
