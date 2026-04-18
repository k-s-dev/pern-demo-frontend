"use server";

import * as v from "valibot";
import { parseFormData, prepareValibotErrors } from "@/lib/utils/form";
import { routes } from "@/lib/routes";
import { ERROR_MESSAGES } from "@/lib/constants/index";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SFormData, TData, TFormData, TFormState } from "../../definitions";
import { workspaceCreate, workspaceUpdate } from "../../../../data";
import { TServerResponse } from "@/lib/definitions/serverResponse";

export async function serverAction(
  id: string | undefined,
  mode: "create" | "update",
  prevState: TFormState | null,
  formData: FormData,
): Promise<TFormState> {
  const rawFormData = Object.fromEntries(formData) as unknown as TFormData;

  if (mode === "update" && !id) {
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: { root: ["Id is required for update."] },
    };
  }

  // parse form data
  const parsedFormData = parseFormData({
    formData,
    info: { numbers: ["order", "group"] },
  });

  // Validate data
  const validationResult = v.safeParse(SFormData, parsedFormData);

  // handle validation errors
  if (!validationResult.success) {
    const errors = v.flatten<typeof SFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  const validatedData = validationResult.output;

  // prepare data for submission to backend
  const apiSubmissionData = {
    ...validatedData,
  };

  // try submitting data to backend
  let response: TServerResponse<TData> = {
    error: { message: "Internal server error." },
  };

  // specific name used for create
  if (mode === "create") {
    response = await workspaceCreate(apiSubmissionData);
  }

  // specific name used for update
  if (mode === "update" && !!id) {
    response = await workspaceUpdate(id, apiSubmissionData);
  }

  if (response.error) {
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

  // specific route details used
  revalidatePath(routes.org.tasks.root);
  redirect(routes.org.tasks.settings.root, RedirectType.push);
}
