"use server";

import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { routes } from "@/lib/routes";
import sanitizeHtml from "sanitize-html";
import {
  SCategoryFormData,
  TCategoryFormData,
  TCategoryFormState,
  TCategoryWithChildren,
} from "../../definitions";
import { categoryGet, categoryUpdate } from "../../data";
import { redirect } from "next/navigation";

export async function categoryUpdateServerAction(
  category: TCategoryWithChildren,
  prevState: TCategoryFormState | null,
  formData: FormData,
): Promise<TCategoryFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TCategoryFormData;
  // retreive data
  const parsedFormData = parseFormData({
    formData,
    info: {
      numbers: ["order"],
    },
  });

  // Validate form
  const validationResult = v.safeParse(SCategoryFormData, parsedFormData);

  // handle validation errors
  if (!validationResult.success) {
    const errors = v.flatten<typeof SCategoryFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  const validatedData = validationResult.output;

  // prepare form data for submission to backend
  let response;
  response = await categoryGet(category.id);

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

  const apiSubmissionData = {
    ...response.data,
    ...validatedData,
    description: sanitizeHtml(validatedData.description || ""),
  };

  // try submitting data to backend
  response = await categoryUpdate(category.id, apiSubmissionData);
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

  redirect(routes.org.tasks.workspace.withId(category.workspaceId));
}
