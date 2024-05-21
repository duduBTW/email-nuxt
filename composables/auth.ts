// import querystring from "querystring"

export async function useConnectedUsersFetch() {
  const connectedUsers = useConnectedUsers();
  return await useApiFetch<UserDto[]>("/user/byids", {
    query: {
      ids: connectedUsers,
    },
  });
}

export function useConnectedUsers() {
  const config = useRuntimeConfig();
  const connectedUsers = useCookie(config.public.AUTH_ID_LIST);
  if (!connectedUsers.value) {
    return [];
  }

  try {
    const decodedConnectedUsers = JSON.parse(
      decodeBase64(connectedUsers.value)
    );
    if (!Array.isArray(decodedConnectedUsers)) {
      return [];
    }

    return decodedConnectedUsers.filter(
      (userId) => typeof userId === "string"
    ) as string[];
  } catch (error) {
    return [];
  }
}

function decodeBase64(encodedValue: string) {
  return atob(encodedValue);
}
