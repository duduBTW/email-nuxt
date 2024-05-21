export const useSnackbar = () => {
  const state = useState<string | undefined>("snackbar");
  const snackTimeout = useState<NodeJS.Timeout | undefined>("snackTimeout");

  const openSnack = (text: string, duration = 2000) => {
    if (snackTimeout.value) {
      clearTimeout(snackTimeout.value);
    }

    state.value = text;
    snackTimeout.value = setTimeout(() => {
      state.value = undefined;
    }, duration);
  };

  return {
    state,
    openSnack,
  };
};
