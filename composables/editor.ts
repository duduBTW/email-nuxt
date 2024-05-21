import StarterKit from "@tiptap/starter-kit";
import { type Extensions } from "@tiptap/vue-3";
import { Extension } from "@tiptap/core";

const CustomExtension = Extension.create({
  name: "customExtension",
  addKeyboardShortcuts() {
    return {
      // TODO
      // ↓ your new keyboard shortcut
      Tab: () => {
        (
          document.querySelector("#send-button") as
            | HTMLButtonElement
            | undefined
        )?.focus();
        return true;
      },
    };
  },
  // Your code goes here.
});

export const tiptapExtensions: Extensions = [StarterKit, CustomExtension];
