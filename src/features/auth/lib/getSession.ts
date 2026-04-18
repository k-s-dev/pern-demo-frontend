"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { TSessionData } from "@/lib/definitions/backend/auth/generic";

export async function getSession() {
  const headersList = new Headers(await headers());
  const response = await auth.api.getSession({
    headers: headersList,
  });
  return response as TSessionData | null;
}
