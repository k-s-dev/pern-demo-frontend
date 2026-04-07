import {
  STaskCreateDataIn,
  TTaskCreateDataIn,
  TTaskIncludeAll,
} from "@/lib/definitions/backend/org/task";
import * as v from "valibot";

export type TTaskUi = TTaskIncludeAll;

export const STaskFormData = STaskCreateDataIn;
export type TTaskFormData = TTaskCreateDataIn;
export type TTaskFormErrors = v.FlatErrors<typeof STaskCreateDataIn>;

export type TTaskFormState = {
  status?: "success" | "error";
  data?: TTaskFormData;
  errors?: TTaskFormErrors;
  messages?: string[];
};
