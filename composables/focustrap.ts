export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  onFocus: (trapElement: T) => void
) {
  const trapRef = ref<T | null>();

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
