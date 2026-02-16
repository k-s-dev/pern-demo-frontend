"use client";

import * as v from "valibot";

import { parseFormData } from "@/lib/utils/form";
import {
  SResetPasswordForm,
  TResetPasswordFormState,
  TResetPasswordFormStateData,
} from "./definitions";
import { authClient } from "@/features/auth/lib/auth.client";
import { revokeSessionsServerAction } from "@/features/auth/lib/server.actions";

export async function resetPasswordClientAction(
  validationSchema: typeof SResetPasswordForm,
  token: string,
  prevState: TResetPasswordFormState | null,
  formData: FormData,
): Promise<TResetPasswordFormState> {
  const rawFormData = Object.fromEntries(formData);
  const parsedFormData = parseFormData({ formData });

  const validationResult = v.safeParse(validationSchema, parsedFormData);
  if (!validationResult.success) {
    const errors = v.flatten<typeof validationSchema>(validationResult.issues);
    return {
      ...prevState,
      status: "error",
      data: rawFormData as TResetPasswordFormStateData,
      errors: errors,
    };
  }

  const response = await authClient.resetPassword({
    token,
    newPassword: validationResult.output.password,
  });

  if (response.error) {
    return {
      ...prevState,
      status: "error",
      data: rawFormData as TResetPasswordFormStateData,
      errors: { root: [response.error.message || response.error.statusText] },
    };
  }

  await revokeSessionsServerAction();
  await authClient.signOut();

  return {
    ...prevState,
    status: "success",
    messages: ["Password reset successful."],
  };
}
