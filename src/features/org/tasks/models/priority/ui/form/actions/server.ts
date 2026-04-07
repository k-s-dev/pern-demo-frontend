"use server";

import * as v from "valibot";
import { parseFormData, prepareValibotErrors } from "@/lib/utils/form";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import { ERROR_MESSAGES } from "@/lib/constants/index";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";
import {
  SPriorityFormData,
  TPriorityFormData,
  TPriorityFormState,
} from "../../../definitions";
import { priorityCreate, priorityUpdate } from "../../../data";
import { redirect } from "next/navigation";

export async function priorityServerAction(
  id: string | undefined,
  workspace: TWorkspaceIncludeAll,
  mode: "create" | "update",
  prevState: TPriorityFormState | null,
  formData: FormData,
): Promise<TPriorityFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TPriorityFormData;
  // parse form data
  const parsedFormData = parseFormData({
    formData,
    info: { numbers: ["order", "group"] },
  });

  // Validate data
  const validationResult = v.safeParse(SPriorityFormData, parsedFormData);

  // handle validation errors
  if (!validationResult.success) {
    const errors = v.flatten<typeof SPriorityFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: parsedFormData as TPriorityFormData,
      errors: errors,
    };
  }

  const validatedData = validationResult.output;

  // prepare data for submission to backend
  const apiSubmissionData = {
    ...validatedData,
  };

  // try submitting data to backend
  let response;

  if (mode === "create") {
    response = await priorityCreate(apiSubmissionData);
  }

  if (mode === "update" && id) {
    response = await priorityUpdate(id, apiSubmissionData);
  }

  if (response?.error) {
    return {
      status: "error",
      data: rawFormData,
      errors: {
        root: response?.error
          ? prepareValibotErrors(response.error.message)
          : [ERROR_MESSAGES.internalServer],
      },
    };
  }

  revalidatePath(routes.org.tasks.root);
  redirect(routes.org.tasks.workspace.withId(workspace.id));
}
