import { SUserFull } from "@/lib/definitions/backend/auth/user";
import * as v from "valibot";

export const SSignInFormBase = v.required(
  v.pick(SUserFull, ["email"]),
  "Required",
);

export const SSignInForm = v.required(
  v.pick(SUserFull, ["email", "password"]),
  "Required.",
);

export type TSignInFormAction = "signIn" | "reset" | "verify";
export type TSignInFormStateData = v.InferInput<typeof SSignInForm>;
export type TSignInFormStateErrors = v.FlatErrors<typeof SSignInForm>;
export type TSignInFormState = {
  status?: "success" | "error";
  data?: TSignInFormStateData;
  errors?: TSignInFormStateErrors;
  messages?: string[];
  action?: TSignInFormAction;
  touched?: boolean;
};
