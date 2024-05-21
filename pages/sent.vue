<script setup lang="ts">
const dialog = useDialog();
const hasDialogOpen = computed(() => typeof dialog.value !== "undefined");
const { data: recievedEmails } = await useApiFetch<EmailDto[]>("/email/sent");

const isEmpty = computed(
  () => recievedEmails.value === null || recievedEmails.value.length <= 0
);
</script>

<template>
  <div class="container" :class="{ 'expandend-content': !hasDialogOpen }">
    <h2 class="subject">Sent emails</h2>
    <email-list-empty v-if="recievedEmails === null || isEmpty" />
    <email-list-content
      v-else
      :get-primary-text="(email) => email.recievers?.[0].name ?? ''"
      :get-secondary-text="(email) => email.subject"
      :get-profile-pricture="
        (email) => email.recievers?.[0].profilePicture ?? ''
      "
      :emails="recievedEmails"
    />
  </div>
</template>

<style scoped>
.container {
  transition: padding 75ms ease-out;
  height: 100%;

  .subject {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 16px;
    color: var(--text-light);
  }
}

.expandend-content {
  padding-inline: 24px;
}
</style>
