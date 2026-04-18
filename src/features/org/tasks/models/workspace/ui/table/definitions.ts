import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";
import {
  SWorkspaceFormData,
  TWorkspaceFormData,
  TWorkspaceFormErrors,
  TWorkspaceFormState,
} from "../../definitions";

export const title = "Workspaces";
export const htmlTitleId = "workspaces-table-title";
export const columnWidths = "1fr 5fr repeat(4, 3fr)";

export type TData = TWorkspaceIncludeAll;

export const SFormData = SWorkspaceFormData;
export type TFormState = TWorkspaceFormState;
export type TFormData = TWorkspaceFormData;
export type TFormErrors = TWorkspaceFormErrors;
