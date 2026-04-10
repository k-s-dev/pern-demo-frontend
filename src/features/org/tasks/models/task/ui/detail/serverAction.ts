"use server";

import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { routes } from "@/lib/routes";
import sanitizeHtml from "sanitize-html";
import {
  STaskFormData,
  TTaskFormData,
  TTaskFormState,
} from "../../definitions";
import { taskGet, taskUpdate } from "../../data";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function taskUpdateServerAction(
  id: string,
  tagIds: string[],
  prevState: TTaskFormState | null,
  formData: FormData,
): Promise<TTaskFormState> {
  const rawFormData = Object.fromEntries(formData) as unknown as TTaskFormData;
  // retreive data
  const parsedFormData = parseFormData({
    formData,
    info: {
      dates: ["start_date", "end_date", "estimated_start", "estimated_end"],
    },
  });

  // Validate form
  const validationResult = v.safeParse(STaskFormData, parsedFormData);

  // handle validation errors
  if (!validationResult.success) {
    const errors = v.flatten<typeof STaskFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  const validatedData = validationResult.output;

  // prepare form data for submission to backend
  const headersList = await headers();
  const response = await taskGet(id, headersList);

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
    ...validatedData,
    description: sanitizeHtml(validatedData.description || ""),
    tagIds,
  };

  // try submitting data to backend
  const updateResponse = await taskUpdate(id, apiSubmissionData);
  if (updateResponse.error) {
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

  revalidatePath(routes.org.tasks.root, "layout");
  redirect(routes.org.tasks.root);
}
