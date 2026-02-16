import { SUserFull } from "@/lib/definitions/backend/auth/user";
import { TFormState } from "@/lib/definitions/form";
import * as v from "valibot";

export const SResetPasswordForm = v.pipe(
  v.required(
    v.pick(SUserFull, ["password", "confirmPassword"]),
    ["password", "confirmPassword"],
    "Required.",
  ),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type TResetPasswordFormStateData = v.InferInput<
  typeof SResetPasswordForm
>;
export type TResetPasswordFormStateErrors = v.FlatErrors<
  typeof SResetPasswordForm
>;
export type TResetPasswordFormState = TFormState<
  TResetPasswordFormStateData,
  TResetPasswordFormStateErrors
>;
