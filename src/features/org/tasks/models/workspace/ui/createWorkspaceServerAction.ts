"use server";

import { routes } from "@/lib/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkspaceServerAction() {
  revalidatePath(routes.org.tasks.settings.root);
  redirect(routes.org.tasks.settings.root);
}
