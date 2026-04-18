"use server";

import { redirect } from "next/navigation";
import { getSession } from "../../getSession";
import { routes } from "@/lib/routes";

export default async function VerifySession() {
  const sessionData = await getSession();
  if (!sessionData) {
    redirect(routes.auth.signIn);
  }
  return null;
}
