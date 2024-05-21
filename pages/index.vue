<script setup lang="ts">
const dialog = useDialog();
const hasDialogOpen = computed(() => typeof dialog.value !== "undefined");

const { data: recievedEmails } = await useApiFetch<EmailDto[]>(
  "/email/recieved"
);

const isEmpty = computed(
  () => recievedEmails.value === null || recievedEmails.value.length <= 0
);
</script>

<template>
  <div class="container" :class="{ 'expandend-content': !hasDialogOpen }">
    <h2 class="subject">Your inbox</h2>
    <email-list-empty v-if="recievedEmails === null || isEmpty" />
    <email-list-content
      v-else
      :get-primary-text="(email) => email.sender.name"
      :get-secondary-text="(email) => email.subject"
      :get-profile-pricture="(email) => email.sender.profilePicture ?? ''"
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
