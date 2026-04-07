import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { categoryUpdateServerAction } from "./serverAction";
import {
  SCategoryFormData,
  TCategoryFormData,
  TCategoryFormState,
} from "../../definitions";

export async function categoryUpdateClientAction(
  id: string,
  prevState: TCategoryFormState | null,
  formData: FormData,
): Promise<TCategoryFormState> {
  const rawFormData = Object.fromEntries(
    formData,
  ) as unknown as TCategoryFormData;
  const parsedFormData = parseFormData({
    formData,
    info: {
      numbers: ["order"],
    },
  });

  const validationResult = v.safeParse(SCategoryFormData, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof SCategoryFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  return await categoryUpdateServerAction(id, prevState, formData);
}
