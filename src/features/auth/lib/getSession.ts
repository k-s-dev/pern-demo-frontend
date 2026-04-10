"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { TSessionData } from "@/lib/definitions/backend/auth/generic";

export async function getSession() {
  const response = await auth.api.getSession({
    headers: await headers(),
  });
  // TODO:HACK:REVIEW review type cast with better-auth
  return response as unknown as TSessionData | null;
}
