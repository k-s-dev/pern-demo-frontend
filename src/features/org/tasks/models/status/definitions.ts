import {
  SStatusCreateDataIn,
  TStatusCreateDataIn,
  TStatusIncludeAll,
} from "@/lib/definitions/backend/org/status";
import * as v from "valibot";

export type TStatusUi = TStatusIncludeAll;

export const SStatusFormData = SStatusCreateDataIn;
export type TStatusFormData = TStatusCreateDataIn;
export type TStatusFormErrors = v.FlatErrors<typeof SStatusCreateDataIn>;

export type TStatusFormState = {
  status?: "success" | "error";
  data?: TStatusFormData;
  errors?: TStatusFormErrors;
  messages?: string[];
};
