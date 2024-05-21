import { H3Event } from "h3";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  console.log(runtimeConfig.public);

  const query = getQuery(event);
  const userId = query.id;

  if (typeof userId !== "string") {
    return await sendRedirect(event, "/api/register", 302);
  }

  setCookie(event, runtimeConfig.public.AUTH_ID, userId);
  connectAccount(event, userId);
  await sendRedirect(event, "/", 302);
});

// --------------
// Private
// --------------
function getConnectedAccounts(event: H3Event) {
  const runtimeConfig = useRuntimeConfig();
  const alreadyLoggedUsers = getCookie(
    event,
    runtimeConfig.public.AUTH_ID_LIST
  );
  if (typeof alreadyLoggedUsers === "undefined") {
    return;
  }

  try {
    const decodedConnectedUsers = JSON.parse(decodeBase64(alreadyLoggedUsers));
    if (!Array.isArray(decodedConnectedUsers)) {
      return;
    }


    return decodedConnectedUsers.filter(
      (userId) => typeof userId === "string"
    ) as string[];
  } catch (error) {
    return;
  }
}

function connectAccount(event: H3Event, userId: string) {
  const runtimeConfig = useRuntimeConfig();
  const alreadyConnectedAccounts = getConnectedAccounts(event) ?? [];
  if(alreadyConnectedAccounts.includes(userId)) {
    return
  }

  const encodedNewConnectedAccountsArray = encodeBase64(
    JSON.stringify([...alreadyConnectedAccounts, userId])
  );
  setCookie(
    event,
    runtimeConfig.public.AUTH_ID_LIST,
    encodedNewConnectedAccountsArray
  );
}

function decodeBase64(value: string) {
  return Buffer.from(value, "base64").toString("ascii");
}

function encodeBase64(value: string) {
  return Buffer.from(value).toString("base64");
}
