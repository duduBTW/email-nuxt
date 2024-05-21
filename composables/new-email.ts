export const useNewEmailStore = defineStore("newEmail", () => {
  const authId = useCookie("authId");

  if (!authId.value) {
    throw new Error("");
  }

  const snackbar = useSnackbar();
  const dialog = useDialog();
  const formData = reactive<Partial<SendEmailDto>>({
    sender: authId.value,
  });
  const update = <Key extends keyof SendEmailDto>(
    key: Key,
    newData: SendEmailDto[Key]
  ) => {
    formData[key] = newData;
  };

  const canSubmit = computed(() => {
    return (
      formData.sender &&
      formData.subject &&
      formData.recievers &&
      formData.recievers.length > 0 &&
      formData.content
    );
  });

  const submit = async () => {
    if (!canSubmit.value) {
      snackbar.openSnack("Missing required fields");
      return;
    }

    dialog.value = undefined;
    snackbar.openSnack("Sending email...");
    await $fetch("/email/send", {
      baseURL: API_BASE_URL,
      method: "POST",
      body: {
        ...formData,
        senderId: formData.sender,
        receiverUserIds: formData.recievers?.map((reciever) => reciever.id),
      },
      headers: authId.value ? { authId: authId.value } : {},
    });

    snackbar.openSnack("Email sent!");
  };

  // return { from, to, subject, content, canSubmit, submit, isLoading };
  return { formData, update, submit, canSubmit };
});
