"use server";

import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants";

export async function signInEmailServerAction() {
  revalidateTag(tags.session.tag, tags.session.profile);
  redirect(routes.DEFAULT_SIGNIN_REDIRECT);
}
