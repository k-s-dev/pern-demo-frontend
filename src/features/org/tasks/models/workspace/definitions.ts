import {
  SWorkspaceCreateDataIn,
  TWorkspaceCreateDataIn,
  TWorkspaceIncludeAll,
} from "@/lib/definitions/backend/org/workspace";
import * as v from "valibot";

export type TWorkspaceUi = TWorkspaceIncludeAll;

export const SWorkspaceFormData = SWorkspaceCreateDataIn;
export type TWorkspaceFormData = TWorkspaceCreateDataIn;
export type TWorkspaceFormErrors = v.FlatErrors<typeof SWorkspaceCreateDataIn>;

export type TWorkspaceFormState = {
  status?: "success" | "error";
  data?: TWorkspaceFormData;
  errors?: TWorkspaceFormErrors;
  messages?: string[];
};
