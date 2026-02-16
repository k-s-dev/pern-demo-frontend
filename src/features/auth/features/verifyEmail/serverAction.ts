"use server";

import { betterAuthFetch } from "@/lib/data/betterFetchFactory";
import { authEndpoints } from "../../lib/authEndpoints";
import { prepareHeaders } from "@/lib/data/utils";

export async function verifyEmailServerAction(token: string) {
  const response = betterAuthFetch(authEndpoints["/verify-email"], {
    query: { token },
    headers: await prepareHeaders(),
  });

  return response;
}
