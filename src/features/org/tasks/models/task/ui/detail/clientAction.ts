import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { taskUpdateServerAction } from "./serverAction";
import {
  STaskFormData,
  TTaskFormData,
  TTaskFormState,
} from "../../definitions";

export async function taskUpdateClientAction(
  id: string,
  categoryId: string,
  tagIds: string[],
  prevState: TTaskFormState | null,
  formData: FormData,
): Promise<TTaskFormState> {
  const rawFormData = Object.fromEntries(formData) as unknown as TTaskFormData;
  const parsedFormData = parseFormData({
    formData,
    info: {
      dates: ["start_date", "end_date", "estimated_start", "estimated_end"],
    },
  });

  const validationResult = v.safeParse(STaskFormData, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof STaskFormData>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData,
      errors: errors,
    };
  }

  return await taskUpdateServerAction(
    id,
    categoryId,
    tagIds,
    prevState,
    formData,
  );
}
