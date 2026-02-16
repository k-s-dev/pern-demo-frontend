"use server";

import { betterAuthFetch } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/utils";
import { authEndpoints } from "../lib/authEndpoints";

export async function revokeSessionsServerAction() {
  const response = betterAuthFetch(authEndpoints["/revoke-sessions"], {
    method: "POST",
    headers: await prepareHeaders(),
    body: JSON.stringify({}),
  });

  return response;
}

export async function verifyEmailServerAction(token: string) {
  const response = betterAuthFetch(authEndpoints["/verify-email"], {
    query: { token },
    headers: await prepareHeaders(),
  });

  return response;
}
