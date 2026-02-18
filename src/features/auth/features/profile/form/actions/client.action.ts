"use client";

import * as v from "valibot";

import { parseFormData } from "@/lib/utils/form";
import {
  SProfileForm,
  TProfileFormState,
  TProfileFormStateData,
} from "../definitions";
import { TUser } from "@/features/auth/lib/definitions";
import { updateProfileServerAction } from "./server.actions";

export async function updateProfileClientAction(
  user: TUser,
  imageFile: File | null,
  prevState: TProfileFormState | null,
  formData: FormData,
): Promise<TProfileFormState> {
  const rawFormData = Object.fromEntries(formData);
  const parsedFormData = parseFormData({
    formData,
    excludeKeys: ["imageFile"],
  });

  const validationResult = v.safeParse(SProfileForm, parsedFormData);

  if (!validationResult.success) {
    const errors = v.flatten<typeof SProfileForm>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData as TProfileFormStateData,
      errors: errors,
    };
  }

  return await updateProfileServerAction(user, imageFile, prevState, formData);
}
