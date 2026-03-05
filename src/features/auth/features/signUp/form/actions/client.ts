"use client";

import * as v from "valibot";

import { parseFormData } from "@/lib/utils/form";
import {
  SSignUpForm,
  TSignUpFormState,
  TSignUpFormStateData,
} from "../definitions";
import { USER_ROLE } from "@/features/auth/lib/definitions";
import { authClient } from "@/features/auth/lib/auth.client";

export async function signUpClientAction(
  _prevState: TSignUpFormState | null,
  formData: FormData,
): Promise<TSignUpFormState> {
  const rawFormData = Object.fromEntries(formData);
  const parsedFormData = parseFormData({ formData });

  const validationResult = v.safeParse(SSignUpForm, parsedFormData);

  if (!validationResult.success) {
    const errors = v.flatten<typeof SSignUpForm>(validationResult.issues);
    return {
      status: "error",
      data: rawFormData as TSignUpFormStateData,
      errors: errors,
    };
  }

  const response = await authClient.signUp.email({
    email: validationResult.output.email,
    password: validationResult.output.password,
    name: validationResult.output.name,
    role: USER_ROLE.USER,
  });

  if (response.error) {
    return {
      status: "error",
      data: rawFormData as TSignUpFormStateData,
      errors: {
        root: [
          response.error.message ||
            "Failed to create user due to internal server error.",
        ],
      },
    };
  }

  return {
    status: "success",
    data: rawFormData as TSignUpFormStateData,
  };
}
