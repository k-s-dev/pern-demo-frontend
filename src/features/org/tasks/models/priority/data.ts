"use server";

import { appConfig } from "@/lib/config";
import { betterFetchBase } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  TPriorityCreateDataIn,
  TPriorityIncludeAll,
  TPriorityUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/priority";
import {
  prepareError,
  TServerResponsePromise,
} from "@/lib/definitions/serverResponse";
import { routes } from "@/lib/routes";
import { revalidatePath } from "next/cache";

export async function priorityCreate(
  body: TPriorityCreateDataIn,
): TServerResponsePromise<TPriorityIncludeAll> {
  const url = appConfig.api.url + "/org/priority";
  const response = await betterFetchBase<TPriorityIncludeAll>(url, {
    method: "post",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  console.log(response);
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function priorityGetList(): TServerResponsePromise<
  TPriorityIncludeAll[]
> {
  const url = appConfig.api.url + "/org/priority/list";
  const response = await betterFetchBase<TPriorityIncludeAll[]>(url, {
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function priorityGet(
  id: string,
): TServerResponsePromise<TPriorityIncludeAll> {
  const url = appConfig.api.url + "/org/priority/" + id;
  const response = await betterFetchBase<TPriorityIncludeAll>(url, {
    method: "get",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function priorityUpdate(
  id: string,
  body: TPriorityUpdatePatchDataIn,
): TServerResponsePromise<TPriorityIncludeAll> {
  const url = appConfig.api.url + "/org/priority/" + id;
  const response = await betterFetchBase<TPriorityIncludeAll>(url, {
    method: "patch",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function priorityDelete(
  id: string,
): TServerResponsePromise<TPriorityIncludeAll> {
  const url = appConfig.api.url + "/org/priority/" + id;
  const response = await betterFetchBase<TPriorityIncludeAll>(url, {
    method: "delete",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function priorityDeleteMany(ids: string[]) {
  const errorIds = [];
  const errorMessages = [];
  for (const id of ids) {
    const response = await priorityDelete(id);
    if (response.error) {
      errorIds.push(id);
      errorMessages.push(
        response.error.message || `Failed to delete priority id: ${id}`,
      );
    }
  }
  if (errorIds.length > 0) {
    return {
      error: {
        message: `Failed to delete ${errorIds.length} of ${ids.length} priorities.`,
        messages: errorMessages,
      },
    };
  }
  revalidatePath(routes.org.tasks.root);
  return {
    data: {},
    message: `${ids.length} priority[s] deleted successfully.`,
  };
}
