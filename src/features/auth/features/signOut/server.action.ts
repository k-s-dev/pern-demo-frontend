"use server";

import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export async function signOutServerAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect(routes.DEFAULT_SIGNOUT_REDIRECT);
}
