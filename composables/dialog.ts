import type { EmailDto } from "./data";

export type DialogMetadata =
  | {
      type: "newEmail";
    }
  | {
      type: "email";
      metadata: EmailDto;
    };

export const useDialog = () => {
  return useState<DialogMetadata | undefined>("dialgo");
};
