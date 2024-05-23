<script setup lang="ts">
const props = defineProps<{
  users: UserDto[] | null;
}>();

const emit = defineEmits(["closePopup"]);

const itemsRef = ref<HTMLElement[]>([]);
const focusableElementId = ref(getFocusableElementId(props.users![0]));

const containerRef = useFocusTrap((trapElement) => {
  focusOn(findFirstFocusableElement(trapElement));
});

const isFocused = (user: UserDto) => {
  return getFocusableElementId(user) === focusableElementId.value;
};

function getFocusableElementId(user: UserDto) {
  return String(user.id);
}

const emailStore = useNewEmailStore();

function selectUser(user: UserDto) {
  emailStore.formData.sender = user.id;
  emit("closePopup");
}

function isActive(user: UserDto) {
  return emailStore.formData.sender === user.id;
}

const handleKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLButtonElement;

  switch (event.key) {
    case "ArrowUp":
      return focusOn(target.previousElementSibling);
    case "ArrowDown":
      return focusOn(target.nextElementSibling);
    case "Enter":
      return handleEnterPress();
    case "Escape":
      emit("closePopup");
      break;

    default: {
      return;
    }
  }
};

function handleEnterPress() {
  const selectedUser = props.users?.find(
    (user) => user.id === focusableElementId.value
  );
  if (!selectedUser) {
    return;
  }

  selectUser(selectedUser);
}

function focusOn(focusTarget: Element | null) {
  if (
    !focusTarget ||
    !("focus" in focusTarget) ||
    typeof focusTarget.focus !== "function"
  ) {
    return;
  }

  const targetId = focusTarget.getAttribute("data-id");
  if (!targetId) {
    return;
  }

  focusTarget.focus();
  focusableElementId.value = targetId;
}

function findFirstFocusableElement(container: HTMLElement) {
  // Get all child elements of the container
  const elements = container.querySelectorAll("*");

  // Iterate through each element
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const isFocusable =
      element.getAttribute("tabindex") === "0" ||
      element.tagName.toLowerCase() === "a" ||
      element.tagName.toLowerCase() === "button" ||
      element.tagName.toLowerCase() === "input" ||
      element.tagName.toLowerCase() === "select" ||
      element.tagName.toLowerCase() === "textarea";

    if (isFocusable) {
      return element;
    }
  }

  // If no focusable element is found, return null
  return null;
}

function handleFocus() {
  window.addEventListener("keydown", handleKeyDown);
}

onMounted(() => {
  containerRef.value?.addEventListener("focusin", handleFocus);
  containerRef.value?.addEventListener("focusout", () => {
    window.removeEventListener("keydown", handleKeyDown);
    containerRef.value?.removeEventListener("focusout", handleFocus);
  });

  if (!containerRef.value) {
    return;
  }

  focusOn(findFirstFocusableElement(containerRef.value));
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  containerRef.value?.removeEventListener("focusin", handleFocus);
  containerRef.value?.removeEventListener("focusout", handleFocus);
});
</script>

<template>
  <ul ref="containerRef">
    <core-user-list-item
      @click="selectUser(user)"
      v-for="user in users"
      :key="user.id"
      :user="user"
      :data-id="user.id"
      :class="{ selected: isActive(user) }"
      :tabindex="isFocused(user) ? '0' : '-1'"
      ref="itemsRef"
    />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
}
</style>
