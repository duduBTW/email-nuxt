export function useFocusTrap(onFocus: (trapElement: HTMLDivElement) => void) {
  const trapRef = ref<HTMLDivElement | null>();

  const handleFocus = (event: FocusEvent) => {
    const trapElement = trapRef.value;
    if (!trapElement) {
      return;
    }

    if (trapElement && !trapElement.contains(event.target as Node | null)) {
      onFocus(trapElement);
    }
  };

  onMounted(() => {
    document.addEventListener("focusin", handleFocus);
  });

  onUnmounted(() => {
    document.removeEventListener("focusin", handleFocus);
  });

  return trapRef;
}
