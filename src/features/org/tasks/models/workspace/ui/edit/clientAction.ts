import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { workspaceUpdateServerAction } from "./serverAction";
import {
  SWorkspaceFormData,
  TWorkspaceFormData,
  TWorkspaceFormState,
} from "../../definitions";

export async function workspaceUpdateClientAction(
  id: string,
  prevState: TWorkspaceFormState | null,
  formData: FormData,
): Promise<TWorkspaceFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TWorkspaceFormData;
  const parsedFormData = parseFormData({ formData });

  const validationResult = v.safeParse(SWorkspaceFormData, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof SWorkspaceFormData>(
      validationResult.issues,
    );
    console.log(errors);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  return await workspaceUpdateServerAction(id, prevState, formData);
}
