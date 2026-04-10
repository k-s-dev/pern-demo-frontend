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
  tagIds: string[],
  resetAction: () => void,
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

  const serverResponse = await taskUpdateServerAction(
    id,
    tagIds,
    prevState,
    formData,
  );

  if (serverResponse.status !== "error") {
    resetAction();
  }

  return serverResponse;
}
