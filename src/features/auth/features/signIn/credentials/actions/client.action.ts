"use client";

import * as v from "valibot";

import { Dispatch, SetStateAction } from "react";
import {
  SSignInForm,
  SSignInFormBase,
  TSignInFormAction,
  TSignInFormState,
  TSignInFormStateData,
} from "../definitions";
import { parseFormData, prepareValibotErrors } from "@/lib/utils/form";
import { authClient } from "@/features/auth/lib/auth.client";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { signInEmailServerAction } from "./server";

export async function emailSignInFormClientAction(
  actionName: TSignInFormAction,
  setActionName: Dispatch<SetStateAction<TSignInFormAction | null>>,
  rememberMe: boolean,
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
        status: "error",
        data: rawFormData as unknown as TSignInFormStateData,
        errors: errors,
        action: actionName,
        touched: true,
      };
    }

    const response = await signInEmailServerAction({
      email: validationResult.output.email,
      password: validationResult.output.password,
      rememberMe: rememberMe,
    });

    if (response.error) {
      return {
        status: "error",
        data: rawFormData as unknown as TSignInFormStateData,
        errors: {
          root: prepareValibotErrors(
            response.error?.messages || [
              "Sign in failed. Make sure credentials are valid and try again.",
            ],
          ),
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
          status: "error",
          data: rawFormData as unknown as TSignInFormStateData,
          errors: {
            root: [response.error.message || "Verification failed. Try again."],
          },
          action: actionName,
          touched: true,
        };
      }

      return {
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
          status: "error",
          data: rawFormData as unknown as TSignInFormStateData,
          errors: {
            root: [
              response.error.message || "Password reset failed. Try again.",
            ],
          },
          action: actionName,
          touched: true,
        };
      }

      return {
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
