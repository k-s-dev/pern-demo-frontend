import { SUserFull } from "@/lib/definitions/backend/auth/user";
import { TFormState } from "@/lib/definitions/form";
import * as v from "valibot";

export const SSignUpForm = v.pipe(
  v.required(
    v.pick(SUserFull, ["email", "password", "confirmPassword", "name"]),
    ["name", "email", "password", "confirmPassword"],
    "Required.",
  ),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type TSignUpFormStateData = v.InferInput<typeof SSignUpForm>;
export type TSignUpFormStateErrors = v.FlatErrors<typeof SSignUpForm>;
export type TSignUpFormState = TFormState<
  TSignUpFormStateData,
  TSignUpFormStateErrors
>;
