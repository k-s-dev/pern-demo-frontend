import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { serverAction } from "./server";
import { SFormData, TFormData, TFormState } from "../../definitions";

export async function clientAction(
  id: string | undefined,
  mode: "create" | "update",
  prevState: TFormState | null,
  formData: FormData,
): Promise<TFormState> {
  const rawFormData = Object.fromEntries(formData) as unknown as TFormData;
  const parsedFormData = parseFormData({
    formData,
    info: { numbers: ["order", "group"] },
  });

  const validationResult = v.safeParse(SFormData, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof SFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  return await serverAction(id, mode, prevState, formData);
}
