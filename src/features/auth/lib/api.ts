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

export async function verifyEmail(query: { token: string }) {
  const response = betterAuthFetch(authEndpoints["/verify-email"], {
    query,
    headers: await prepareHeaders(),
  });

  return response;
}

export async function signInEmail(body: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const response = betterAuthFetch(authEndpoints["/sign-in/email"], {
    method: "POST",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });

  return response;
}

export async function requestPasswordReset(body: { email: string }) {
  const response = betterAuthFetch(authEndpoints["/request-password-reset"], {
    method: "POST",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });

  return response;
}

export async function deleteUser(body: { password: string; token: string }) {
  const response = betterAuthFetch(authEndpoints["/sign-in/email"], {
    method: "POST",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });

  return response;
}
