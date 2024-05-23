<script setup lang="ts">
import EmailList from "~/components/core/email/list/list.vue";
import EmptyEmails from "~/components/core/email/list/empty.vue";

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
    <EmptyEmails v-if="recievedEmails === null || isEmpty" />
    <EmailList
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
