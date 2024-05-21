<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";

const emailStore = useNewEmailStore();

const editor = useEditor({
  content: "",
  extensions: tiptapExtensions,
  onUpdate: ({ editor }) => {
    emailStore.update(
      "content",
      editor.isEmpty ? "" : JSON.stringify(editor.getJSON())
    );
  },
  editorProps: {
    attributes: {
      id: "new-email-content",
      class: "new-email-content",
    },
  },
});

const handleChange = <Key extends keyof SendEmailDto>(
  key: Key,
  event: Event
) => {
  emailStore.update(key, (event.target as HTMLInputElement).value);
};

onMounted(() => {
  document
    .querySelector("#new-email-content")
    ?.addEventListener("focus", () => {
      console.log("out");
    });
});
</script>

<template>
  <div class="new-container">
    <form>
      <email-dialog-new-from-select />
      <input-new-email-autocomplete />

      <div class="input-group">
        <label for="recievers">Subject:</label>
        <input
          :value="emailStore.formData.subject"
          @input="(event) => handleChange('subject', event)"
          id="recievers"
          type="text"
        />
      </div>
    </form>

    <client-only>
      <editor-content class="new-email-editor" :editor="editor" />
    </client-only>
  </div>
</template>

<style scoped>
.new-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: example 165ms ease-in-out;
  opacity: 1;

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .input-group {
      position: relative;
      display: flex;
      align-items: center;

      label {
        display: block;
        width: 80px;
        padding-right: 20px;
      }

      input {
        flex: 1;
        border: none;
        border-bottom: 1px solid var(--divider);
        font-size: 14px;
        line-height: 26px;
        padding: 0px;

        &:focus {
          outline: none;
          border-bottom-color: var(--brand);
        }
      }
    }
  }

  .new-email-editor {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

@keyframes example {
  from {
    transform: translateY(20px);
    opacity: 0.22;
  }
}
</style>
