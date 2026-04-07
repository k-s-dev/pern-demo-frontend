import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { statusServerAction } from "./server";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";
import {
  SStatusFormData,
  TStatusFormData,
  TStatusFormState,
} from "../../../definitions";

export async function statusClientAction(
  id: string | undefined,
  workspace: TWorkspaceIncludeAll,
  mode: "create" | "update",
  prevState: TStatusFormState | null,
  formData: FormData,
): Promise<TStatusFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TStatusFormData;
  const parsedFormData = parseFormData({
    formData,
    info: { numbers: ["order", "group"] },
  });

  const validationResult = v.safeParse(SStatusFormData, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof SStatusFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  return await statusServerAction(id, workspace, mode, prevState, formData);
}
