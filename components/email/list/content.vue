<script setup lang="ts">
const props = defineProps<{
  emails: EmailDto[];
  getPrimaryText: (email: EmailDto) => string;
  getSecondaryText: (email: EmailDto) => string;
  getProfilePricture: (email: EmailDto) => string;
}>();

const focusableElementId = useState("focused-email-list-item", () => {
  return getFocusableElementId(props.emails[0]);
});
const containerRef = ref<HTMLUListElement | null>(null);

// Dialog
const dialog = useDialog();
function handleEmailClick(email: EmailDto) {
  dialog.value = {
    type: "email",
    metadata: email,
  };

  focusableElementId.value = getFocusableElementId(email);
}

function getFocusableElementId(email: EmailDto) {
  return String(email.id);
}

const isSelected = (email: EmailDto) => {
  if (dialog.value?.type !== "email") {
    return false;
  }

  return email.id === dialog.value.metadata.id;
};

const isFocused = (email: EmailDto) => {
  return getFocusableElementId(email) === focusableElementId.value;
};

const handleKeyDown = (event: KeyboardEvent) => {
  let focusTarget: Element | undefined | null;
  const target = event.target as HTMLButtonElement;

  switch (event.key) {
    case "ArrowUp":
      focusTarget = target.previousElementSibling;
      break;
    case "ArrowDown":
      focusTarget = target.nextElementSibling;
      break;

    default: {
      return;
    }
  }

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
};

function handleFocus() {
  window.addEventListener("keydown", handleKeyDown);
}

onMounted(() => {
  containerRef.value?.addEventListener("focusin", handleFocus);
  containerRef.value?.addEventListener("focusout", () => {
    window.removeEventListener("keydown", handleKeyDown);
    containerRef.value?.removeEventListener("focusout", handleFocus);
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  containerRef.value?.removeEventListener("focusin", handleFocus);
  containerRef.value?.removeEventListener("focusout", handleFocus);
});
</script>

<template>
  <ul ref="containerRef">
    <email-list-item
      v-for="email in emails"
      @click="handleEmailClick(email)"
      :key="email.id"
      :data-id="email.id"
      :is-selected="isSelected(email)"
      :tabindex="isFocused(email) ? '0' : '-1'"
      :primary-text="getPrimaryText(email)"
      :secondaty-text="getSecondaryText(email)"
      :profile-picture="getProfilePricture(email)"
    />
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
