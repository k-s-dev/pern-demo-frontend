"use server";

import { appConfig } from "@/lib/config";
import { betterFetchBase } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  TWorkspaceCreateDataIn,
  TWorkspaceIncludeAll,
  TWorkspaceUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/workspace";
import {
  prepareError,
  TServerResponsePromise,
} from "@/lib/definitions/serverResponse";
import { routes } from "@/lib/routes";
import { revalidatePath } from "next/cache";

export async function workspaceCreate(
  body: TWorkspaceCreateDataIn,
): TServerResponsePromise<TWorkspaceIncludeAll> {
  const url = appConfig.api.url + "/org/workspace";
  const response = await betterFetchBase<TWorkspaceIncludeAll>(url, {
    method: "post",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function workspaceGetList(): TServerResponsePromise<
  TWorkspaceIncludeAll[]
> {
  const url = appConfig.api.url + "/org/workspace/list";
  const response = await betterFetchBase<TWorkspaceIncludeAll[]>(url, {
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function workspaceGet(
  id: string,
): TServerResponsePromise<TWorkspaceIncludeAll> {
  const url = appConfig.api.url + "/org/workspace/" + id;
  const response = await betterFetchBase<TWorkspaceIncludeAll>(url, {
    method: "get",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function workspaceUpdate(
  id: string,
  body: TWorkspaceUpdatePatchDataIn,
): TServerResponsePromise<TWorkspaceIncludeAll> {
  const url = appConfig.api.url + "/org/workspace/" + id;
  const response = await betterFetchBase<TWorkspaceIncludeAll>(url, {
    method: "patch",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function workspaceDelete(
  id: string,
): TServerResponsePromise<TWorkspaceIncludeAll> {
  const url = appConfig.api.url + "/org/workspace/" + id;
  const response = await betterFetchBase<TWorkspaceIncludeAll>(url, {
    method: "delete",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function workspaceDeleteMany(ids: string[]) {
  const errorIds = [];
  const errorMessages = [];
  for (const id of ids) {
    const response = await workspaceDelete(id);
    if (response.error) {
      errorIds.push(id);
      errorMessages.push(
        response.error.message || `Failed to delete workspace id: ${id}`,
      );
    }
  }
  if (errorIds.length > 0) {
    return {
      error: {
        message: `Failed to delete ${errorIds.length} of ${ids.length} workspaces.`,
        messages: errorMessages,
      },
    };
  }
  revalidatePath(routes.org.tasks.root);
  return {
    data: {},
    message: `${ids.length} workspace[s] deleted successfully.`,
  };
}
