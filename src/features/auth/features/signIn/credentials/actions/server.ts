"use server";

import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export async function signInEmailServerAction() {
  redirect(routes.DEFAULT_SIGNIN_REDIRECT);
}
