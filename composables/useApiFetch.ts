import type { UseFetchOptions } from "#app";
import { defu } from "defu";

export const API_BASE_URL = "http://127.0.0.1:3001/";

export async function useApiFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const authId = useCookie("authId");
  const defaults: UseFetchOptions<T> = {
    baseURL: API_BASE_URL,
    key: url,
    headers: authId.value ? { authId: authId.value } : {},
    onResponse: ({ options }) => {
      options.headers = { authId: authId.value ?? "" };
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}
