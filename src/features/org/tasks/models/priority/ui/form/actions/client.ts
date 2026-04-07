import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { priorityServerAction } from "./server";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";
import {
  SPriorityFormData,
  TPriorityFormData,
  TPriorityFormState,
} from "../../../definitions";

export async function priorityClientAction(
  id: string | undefined,
  workspace: TWorkspaceIncludeAll,
  mode: "create" | "update",
  prevState: TPriorityFormState | null,
  formData: FormData,
): Promise<TPriorityFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TPriorityFormData;
  const parsedFormData = parseFormData({
    formData,
    info: { numbers: ["order", "group"] },
  });

  const validationResult = v.safeParse(SPriorityFormData, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof SPriorityFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  return await priorityServerAction(id, workspace, mode, prevState, formData);
}
