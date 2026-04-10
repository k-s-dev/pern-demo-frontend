import {
  STaskCreateDataIn,
  STaskUpdatePatchDataIn,
  TTaskIncludeAll,
  TTaskUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/task";
import * as v from "valibot";

export type TTaskUi = TTaskIncludeAll;

export const STaskFormData = STaskUpdatePatchDataIn;
export type TTaskFormData = TTaskUpdatePatchDataIn;
export type TTaskFormErrors = v.FlatErrors<typeof STaskCreateDataIn>;

export type TTaskFormState = {
  status?: "success" | "error";
  data?: TTaskFormData;
  errors?: TTaskFormErrors;
  messages?: string[];
};
