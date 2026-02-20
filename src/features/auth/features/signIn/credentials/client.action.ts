"use client";

import * as v from "valibot";

import { Dispatch, SetStateAction } from "react";
import {
  SSignInForm,
  SSignInFormBase,
  TSignInFormAction,
  TSignInFormState,
  TSignInFormStateData,
} from "./definitions";
import { parseFormData } from "@/lib/utils/form";
import { authClient } from "@/features/auth/lib/auth.client";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export async function emailSignInFormClientAction(
  actionName: TSignInFormAction,
  setActionName: Dispatch<SetStateAction<TSignInFormAction | null>>,
  prevState: TSignInFormState | null,
  formData: FormData,
): Promise<TSignInFormState> {
  setActionName(actionName);
  const rawFormData = Object.fromEntries(formData);
  const parsedFormData = parseFormData({
    formData,
    info: { booleans: ["rememberMe"] },
  });

  if (actionName === "signIn") {
    const validationResult = v.safeParse(SSignInForm, parsedFormData);

    if (!validationResult.success) {
      const errors = v.flatten<typeof SSignInForm>(validationResult.issues);
      return {
        ...prevState,
        status: "error",
        data: rawFormData as unknown as TSignInFormStateData,
        errors: errors,
        action: actionName,
        touched: true,
      };
    }

    const response = await authClient.signIn.email({
      email: validationResult.output.email,
      password: validationResult.output.password,
      rememberMe: validationResult.output.rememberMe,
    });

    if (response.error) {
      return {
        ...prevState,
        status: "error",
        data: rawFormData as unknown as TSignInFormStateData,
        errors: {
          root: [
            response.error.message ||
              "Sign in failed due to internal server error.",
          ],
        },
        action: actionName,
        touched: true,
      };
    }
  } else {
    const validationResult = v.safeParse(SSignInFormBase, parsedFormData);

    if (!validationResult.success) {
      const errors = v.flatten<typeof SSignInFormBase>(validationResult.issues);
      return {
        ...prevState,
        status: "error",
        data: rawFormData as unknown as TSignInFormStateData,
        errors: errors,
        action: actionName,
        touched: true,
      };
    }

    if (actionName === "verify") {
      const response = await authClient.sendVerificationEmail({
        email: validationResult.output.email,
      });

      if (response.error) {
        return {
          ...prevState,
          status: "error",
          data: rawFormData as unknown as TSignInFormStateData,
          errors: {
            root: [response.error.message || "Internal server error."],
          },
          action: actionName,
          touched: true,
        };
      }

      return {
        ...prevState,
        status: "success",
        data: parsedFormData as TSignInFormStateData,
        messages: ["Verification email sent."],
        action: actionName,
        touched: true,
      };
    }

    if (actionName === "reset") {
      const response = await authClient.requestPasswordReset({
        email: validationResult.output.email,
      });
      if (response.error) {
        return {
          ...prevState,
          status: "error",
          data: rawFormData as unknown as TSignInFormStateData,
          errors: {
            root: [response.error.message || "Internal server error."],
          },
          action: actionName,
          touched: true,
        };
      }

      return {
        ...prevState,
        status: "success",
        data: rawFormData as unknown as TSignInFormStateData,
        messages: [response.data.message],
        action: actionName,
        touched: true,
      };
    }
  }

  redirect(routes.DEFAULT_SIGNIN_REDIRECT);
}
