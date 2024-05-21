<script setup lang="ts">
import { generateHTML } from "@tiptap/html";
import { sanitize } from "isomorphic-dompurify";

const props = defineProps<{
  metadata: EmailDto;
}>();

const htmlContent = computed(() => {
  try {
    return sanitize(
      generateHTML(JSON.parse(props.metadata.content), tiptapExtensions)
    );
  } catch (error) {
    return null;
  }
});
</script>

<template>
  <div class="details-container">
    <h2 class="subject">{{ metadata.subject }}</h2>

    <div class="details">
      <img
        :src="metadata.sender.profilePicture"
        alt="Email sender profile picture"
        class="avatar"
      />

      <div class="right-part">
        <p class="sender">
          {{ metadata.sender.name }}
          {{ "<<" }}<span>{{ metadata.sender.email }}</span
          >{{ ">>" }}
        </p>

        <p class="recievers">
          <span>To: </span>
          <span v-for="user in metadata.recievers" :title="user.email">{{
            user.name
          }}</span>
        </p>
      </div>
    </div>
    <div v-if="htmlContent" v-html="htmlContent" />
    <div v-else>Something went wrong!</div>
  </div>
</template>

<style scoped>
.details-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subject {
  font-size: 14px;
  font-weight: bold;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 56px;
  border: 1px solid var(--divider);
}

.details {
  display: flex;
  align-items: center;
  gap: 16px;

  .right-part {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .sender {
      font-size: 16px;
      font-weight: bold;
    }

    .recievers {
      font-size: 14px;
      color: var(--text-light);
    }
  }
}
</style>
