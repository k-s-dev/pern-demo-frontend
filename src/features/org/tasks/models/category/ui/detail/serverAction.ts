"use server";

import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";
import sanitizeHtml from "sanitize-html";
import {
  SCategoryFormData,
  TCategoryFormData,
  TCategoryFormState,
} from "../../definitions";
import { categoryGet, categoryUpdate } from "../../data";

export async function categoryUpdateServerAction(
  id: string,
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

  try {
    response = await categoryGet(id);
  } catch {
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
    ...response.data,
    description: sanitizeHtml(validatedData.description || ""),
  };

  // try submitting data to backend
  try {
    await categoryUpdate(id, apiSubmissionData);
  } catch (error) {
    console.log(error);
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

  revalidatePath(routes.org.tasks.root);
  return {
    status: "success",
    data: rawFormData,
  };
}
