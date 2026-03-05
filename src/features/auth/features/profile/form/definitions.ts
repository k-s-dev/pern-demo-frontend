import { SUserFull } from "@/lib/definitions/backend/auth/user";
import { TFormState } from "@/lib/definitions/form";
import * as v from "valibot";

export const SProfileForm = v.pipe(
  v.partial(v.pick(SUserFull, ["name", "image", "emailVerified"])),
);

export type TProfileFormStateData = v.InferInput<typeof SProfileForm>;
export type TProfileFormStateErrors = v.FlatErrors<typeof SProfileForm>;
export type TProfileFormState = TFormState<
  TProfileFormStateData,
  TProfileFormStateErrors
>;
