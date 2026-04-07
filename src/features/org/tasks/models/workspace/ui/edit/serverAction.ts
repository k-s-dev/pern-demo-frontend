"use server";

import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import {
  SWorkspaceFormData,
  TWorkspaceFormData,
  TWorkspaceFormState,
} from "../../definitions";
import { workspaceUpdate } from "../../data";

export async function workspaceUpdateServerAction(
  id: string,
  prevState: TWorkspaceFormState | null,
  formData: FormData,
): Promise<TWorkspaceFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TWorkspaceFormData;
  // retreive data
  const parsedFormData = parseFormData({ formData });

  // Validate form
  const validationResult = v.safeParse(SWorkspaceFormData, parsedFormData);

  // handle validation errors
  if (!validationResult.success) {
    const errors = v.flatten<typeof SWorkspaceFormData>(
      validationResult.issues,
    );
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  const validatedData = validationResult.output;

  // prepare form data for submission to backend
  const apiSubmissionData = {
    ...validatedData,
    description: sanitizeHtml(validatedData.description || ""),
  };

  // try submitting data to backend
  const response = await workspaceUpdate(id, apiSubmissionData);
  if (response.error) {
    return {
      status: "error",
      data: rawFormData,
      errors: {
        root: [
          "Failed to update user due to internal server error. Please try again.",
        ],
      },
    };
  }

  revalidatePath(routes.org.root);
  redirect(routes.org.tasks.workspace.withId(id));
}
