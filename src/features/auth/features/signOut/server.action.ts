"use server";

import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export async function signOutServerAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
