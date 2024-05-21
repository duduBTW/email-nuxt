declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    AUTH_ID: string;
    AUTH_ID_LIST: string;
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {};
