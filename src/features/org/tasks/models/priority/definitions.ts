import {
  SPriorityCreateDataIn,
  TPriorityCreateDataIn,
  TPriorityIncludeAll,
} from "@/lib/definitions/backend/org/priority";
import * as v from "valibot";

export type TPriorityUi = TPriorityIncludeAll;

export const SPriorityFormData = SPriorityCreateDataIn;
export type TPriorityFormData = TPriorityCreateDataIn;
export type TPriorityFormErrors = v.FlatErrors<typeof SPriorityCreateDataIn>;

export type TPriorityFormState = {
  status?: "success" | "error";
  data?: TPriorityFormData;
  errors?: TPriorityFormErrors;
  messages?: string[];
};
