"use client";

import * as v from "valibot";

import { parseFormData } from "@/lib/utils/form";
import {
  SSignUpForm,
  TSignUpFormState,
  TSignUpFormStateData,
} from "./definitions";
import { TValibotMessage } from "@/lib/definitions/errors";
import { authClient } from "@/features/auth/lib/auth.client";
import { USER_ROLE } from "@/features/auth/lib/definitions";

export async function signUpClientAction(
  prevState: TSignUpFormState | null,
  formData: FormData,
): Promise<TSignUpFormState> {
  const rawFormData = Object.fromEntries(formData);
  const parsedFormData = parseFormData({ formData });

  const validationResult = v.safeParse(SSignUpForm, parsedFormData);

  if (!validationResult.success) {
    const errors = v.flatten<typeof SSignUpForm>(validationResult.issues);
    return {
      ...prevState,
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
      ...prevState,
      status: "error",
      data: rawFormData as TSignUpFormStateData,
      errors: {
        root: [
          ...(response.error.message ||
            "Failed to create user due to internal server error."),
        ] as TValibotMessage,
      },
    };
  }

  return {
    ...prevState,
    status: "success",
    data: rawFormData as TSignUpFormStateData,
  };
}
