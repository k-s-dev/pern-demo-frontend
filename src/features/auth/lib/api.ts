"use server";

import { betterAuthFetch } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/utils";
import { authEndpoints } from "../lib/authEndpoints";

export async function revokeSessions() {
  const response = betterAuthFetch(authEndpoints["/revoke-sessions"], {
    method: "POST",
    headers: await prepareHeaders(),
    body: JSON.stringify({}),
  });

  return response;
}

export async function verifyEmail(token: string) {
  const response = betterAuthFetch(authEndpoints["/verify-email"], {
    query: { token },
    headers: await prepareHeaders(),
  });

  return response;
}

export async function signInEmail(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const response = betterAuthFetch(authEndpoints["/sign-in/email"], {
    method: "POST",
    headers: await prepareHeaders(),
    body: JSON.stringify(data),
  });

  return response;
}
